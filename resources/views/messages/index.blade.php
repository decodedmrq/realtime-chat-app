@extends('layouts.desktop')
@push('css')
{!! html()->style('css/home.css') !!}
@endpush

@section('content')
    <div class="row">
        {{--member list--}}
        @include('messages.member_list')
        <!--=========================================================-->
        <!-- selected chat -->
        @include('messages.selected_chat')
    </div>
@endsection
