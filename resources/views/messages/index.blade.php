@extends('layouts.desktop')
@push('css')
{!! html()->style('css/home.css') !!}
@endpush

@section('content')
    <div id="messages"></div>
@endsection
