@php($route = Route::current())
@php($currentRouteName = substr($route->getName(), 0, strpos($route->getName(), '.')))
@php($currentActionName = substr($route->getName(), strpos($route->getName(), '.') + 1))
<ol class="breadcrumb">
    @if (empty($currentRouteName) || $currentRouteName == 'home')
        <li class="breadcrumb-item"><a href="{!! route('home') !!}"><i class="fa fa-dashboard"></i> {!!trans('labels.home') !!}</a></li>
    @else
        <li class="breadcrumb-item"><a href="{!! route('home') !!}"><i class="fa fa-dashboard"></i> {!!trans('labels.home') !!}</a></li>
        <li class="breadcrumb-item"><a href="{!! route($currentRouteName . '.index') !!}">{!! trans('labels.' . $currentRouteName) !!}</a>
        </li>
        <li class="breadcrumb-item active">{!! trans('labels.' . $currentActionName) !!}</li>
    @endif
</ol>
