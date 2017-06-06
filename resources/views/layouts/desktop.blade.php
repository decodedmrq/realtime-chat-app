<!DOCTYPE html>
<html lang="{{ html_helper()->languageCode(config('app.locale')) }}">
@include('layouts.includes.head')
<body>
{{--@include('layouts.includes.header')--}}
{{--@include('layouts.includes.sidebar')--}}
<div class="container-fluid">
    @yield('content')
</div>
@include('layouts.includes.script')
</body>
</html>
