<!DOCTYPE html>
<html lang="{{ html_helper()->languageCode(config('app.locale')) }}">
@include('layouts.includes.head')
<body>
@include('layouts.includes.header')
@include('layouts.includes.sidebar')
<div class="layout-content">
    <noscript>
        <div class="noscript">
            <p>Sorry, JavaScript must be enabled.<br/>Change your browser options, then <a href="">try
                    again</a>.</p>
        </div>
    </noscript>
    <div class="content-scrollable">
        <div class="container-fluid">
            @include('layouts.includes.breadcrumb')
            @yield('content')
        </div>
    </div>
</div>
@include('layouts.includes.script')
</body>
</html>
