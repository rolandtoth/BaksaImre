<!doctype html>
<html lang="hu">

<head>
    <base href="/">
    <meta charset="utf-8">
    <?php
  $metadata = @file_get_contents(__DIR__ . '/../meta.json');

  if ($metadata) {
    $metas = json_decode($metadata, false);
    $segments = getSegments();

    $meta = $metas->{$segments !== '/' ? implode('/', $segments) : 'home'};

    if ($meta) {
      $title = $meta->title ? $meta->title . ' - Baksa Imre' : 'Baksa Imre színész, rendező';
      echo <<< HTML
<title>$title</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content="$title">
    <meta property="og:description" content="{$meta->description}">
    <meta property="og:url" content="{$meta->url}">
    <meta property="fb:app_id" content="966242223397117">
    <meta name="twitter:title" content="$title">
    <meta name="twitter:image:src" content="{$meta->description}">

HTML;
      if ($meta->image) {
        echo <<< HTML
    <meta property="og:image" content="{$meta->image->url}">
    <meta property="og:image:width" content="{$meta->image->width}">
    <meta property="og:image:height" content="{$meta->image->height}">
    <meta name="twitter:description" content="{$meta->image->url}">
HTML;
      }
    } else {
      echo '<title>Baksa Imre színész, rendező</title>';
    }
  }

  function getSegments()
  {
    static $segments;

    if (!$segments) {
      $segments = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

      if ($segments !== '/') {
        $segments = explode('/', $segments);
        $segments = array_filter($segments);
        $segments = array_values($segments);
      }
    }

    return $segments;
  }
  ?>
    <meta name="theme-color" content="#333333">
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>

<body>
    <app-root class="main-wrap"></app-root>
</body>

</html>
