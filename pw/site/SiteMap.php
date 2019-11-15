<?php

class SiteMap {
	private $pages;

	function __construct($items) {
		$this->pages = $this->getDynamicPages(array_merge($this->getStaticPages(), $items));
	}

	function getDynamicPages($data) {
		$items = '';
		$baseUrl = $this->getBaseUrl();

		foreach($data as $item) {
			$type = $this->getPageType($item['template']);
			$url = $item['url'] ?? $baseUrl . $type . '/' . $item['name'];
			$lastmod = date('c', $item['created'] / 1000);

			$items .= <<< HTML
<url>
		<loc>$url</loc>
		<lastmod>$lastmod</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.5</priority>
	</url>
	
HTML;
		}

		return $items;
	}

	function getBaseUrl() {
		return $this->getProtocol() . $_SERVER['HTTP_HOST'] . '/';
	}

	function getPageType($template) {
		if($template === 'play') return "eloadas";
		if($template === 'critic') return "kritika";
		if($template === 'interview') return "interju";
	}

	function getProtocol() {
		if (isset($_SERVER['HTTPS']) &&
			($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1) ||
			isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
			$_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
		  $protocol = 'https://';
		}
		else {
		  $protocol = 'http://';
		}

		return $protocol;
	}

	function getStaticPages() {
		$date = time() * 1000;
		$baseUrl = $this->getBaseUrl();
		
		return [
		  [
			'url' => $baseUrl,
			'created' => $date
		  ],
		  [
			'url' => $baseUrl . 'oneletrajz',
			'created' => $date
		  ],
		  [
			'url' => $baseUrl . 'kapcsolat',
			'created' => $date
		  ]
		];
	}

	function saveXML($path) {
		file_put_contents($path, $this->getXML());
	}

	function getXML() {
		return <<< HTML
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	{$this->pages}
</urlset>
HTML;
	}
}
