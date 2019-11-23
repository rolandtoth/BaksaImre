<?php namespace ProcessWire;

if ($page->template->name === 'admin') {
	return;
}

if ($page->template->name !== 'api') {
	die('Not allowed');
}
	
header('Content-type: application/json');

require_once(__DIR__ . '/SiteMap.php');

$urlSegment1 = wire('input')->urlSegment1;

if ($urlSegment1 === 'items') {
	$apiData = wire('cache')->get('apiData', '+5 minutes', function () {
		$items = wire('pages')->find('template=play|critic|interview, limit=999, sort=-date');
		$itemsArray = array_map('\ProcessWire\getItemData', $items->getArray());

		saveMeta($items);
		saveSiteMap($itemsArray);

		return [
			'items' => $itemsArray,
			'theaters' => wire('pages')->find('template=theater')->explode(['id', 'title', 'link'])
		];
	});

	echo json_encode((object) $apiData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}
else if ($urlSegment1 === 'contact')
{
	echo processContactForm();
}

exit;

function processContactForm() {
	$result = [
		'success' => false,
		'error' => 'Hiba történt, kérjük próbálja újra.',
		'message' => ''
	];

	$rest_json = file_get_contents("php://input");
	$_POST = json_decode($rest_json, true);

	if(empty($_POST) || empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message'])) {
		return json_encode((object) $result);
	}

	$result['success'] = true;
	$result['error'] = '';
	$result['message'] = 'Üzenetét továbbítottuk, köszönjük!';

	$name = wire('sanitizer')->text($_POST['name']);
	$email = wire('sanitizer')->email($_POST['email']);
	$phone = wire('sanitizer')->text($_POST['phone']);
	$message = wire('sanitizer')->textarea($_POST['message']);

	wire('log')->save('contact-form', implode(' | ', [$name, $email, $phone, $message]));

	wire('mail')->send(
		wire('config')->contactFormEmail,
		$email,
		'Új üzenet: baksaimre.hu (' . $name . ')',
		$message . "\r\n\r\n" . $name . "\r\n" . $email
	);

	return json_encode((object) $result);
}

function saveSiteMap($items) {
	$sitemap = new \SiteMap($items);
	$sitemap->saveXML(__DIR__ . '/../../sitemap.xml');
}

function saveMeta($items) {
	$data = [];
    $domain = 'https://baksaimre.hu';

	foreach($items as $p) {
		$categorySegment = '';

		switch($p->template) {
			case 'play':
				$categorySegment = 'eloadas/';
				break;
			case 'critic':
				$categorySegment = 'kritika/';
				break;
			case 'interview':
				$categorySegment = 'interju/';
				break;
		}

		$featured_image = $p->featured_image ? $p->featured_image->size(600,315, ['upscale' => false]) : null;

		$data[$categorySegment . $p->name] = [
			'title' => $p->title,
			'url' => $domain . '/' . $categorySegment . $p->name,
			'description' => $p->intro ? $p->intro : substr(strip_tags($p->body), 0, 200),
			'image' => !$featured_image ?  null : [
				'url' => $featured_image->httpUrl,
				'width' => $featured_image->width,
				'height' => $featured_image->height
			]
		];
	}

	$data['home'] = [
		'title' => 'Baksa Imre színész, rendező',
		'url' => $domain . '/',
		'description' => 'Baksa Imre színész, rendező oldala'
	];

	$data['oneletrajz'] = [
		'title' => 'Önéletrajz',
		'url' => $domain . '/oneletrajz',
		'description' => 'Baksa Imre színész, rendező munkássága évekre bontva'
	];

	$data['kapcsolat'] = [
		'title' => 'Kapcsolat',
		'url' => $domain . '/kapcsolat',
		'description' => 'Baksa Imre színész, rendező elérhetőségei'
	];

	file_put_contents(__DIR__ . '/../../meta.json', json_encode((object) $data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}

function getItemData($p)
{
	$data = [
		'id' => $p->id,
		'name' => $p->name,
		'title' => $p->title,
		'template' => $p->template->name,
		'intro' => $p->intro,
		'body' => str_replace("\n", '', $p->body),
		'author' => $p->author,
		'link' =>  html_entity_decode($p->link),
		'year' => (int) date('Y', $p->date ? strtotime($p->date . ' ' . ($p->time ? $p->time : '19:00')) : $p->created),
		'created' => $p->created * 1000,
		'featured_image' => getImageData($p->featured_image)
	];

	if ($p->images->count) {
		$data['images'] = array_map('\ProcessWire\getImageData', array_values($p->images->getArray()));
	}

	if ($p->seo_description) {
		$data['seo_description'] = $p->seo_description;
	}

	if ($p->template->name === 'play') {
		$data['prepend_intro'] = boolval($p->prepend_intro);
		$data['role'] = $p->role->value;
		$data['figure'] = $p->figure;
		$data['photographer'] = $p->photographer ? explode("\n", $p->photographer) : null;
		$data['videos'] = $p->video ? explode("\n", $p->video) : null;
		$data['premier'] = [
			'datetime' => $p->date ? strtotime($p->date . ' ' . ($p->time ? $p->time : '19:00')) * 1000 : '',
			'theater_id' => $p->theater_ref ? $p->theater_ref->id : null,
			'link' => html_entity_decode($p->link)
		];

		unset($data['link']);
	}

	if ($p->template->name === 'critic') {
		$data['play_ref_id'] = $p->play_ref->id;
	}

	return $data;
}

function getImageData($img)
{
	$data = ['variants' => []];

	$settings = [
		['xs' => [96, 64, null]],
		['sm' => [192, 128, null]],
		['md' => [480, 320, null]],
		['lg' => [990, 0, ['upscaling' => false]]]
	];

	foreach ($settings as $s) {
		foreach ($s as $key => $value) {
			$resized = $img->size($value[0], $value[1], $value[2]);

			$data['variants'][$key] = [
				'width' => $resized->width,
				'height' => $resized->height,
				'url' => $resized->url
			];
		}
	}

	if ($img->description) {
		$data['description'] = $img->description;
	}

	return $data;
}
