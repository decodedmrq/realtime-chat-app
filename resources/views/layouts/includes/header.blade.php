<header class="navbar navbar-toggleable-md bg-white fixed-top left-nav">

            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                    data-target="#main-nav" aria-controls="main-nav" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="main-nav">
                <form class="form-inline mr-auto" id="search-form">
                    <input class="form-control" type="text" placeholder="Search">
                </form>
                <ul class="navbar-nav">
                    @if (auth()->guest())
                        <li class="nav-item active">
                            <a class="nav-link"
                               href="{{ route('login') }}">{{ trans('auth.login') }} <span
                                        class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"
                               href="{{ url('/register') }}">{{ trans('auth.register') }}</a>
                        </li>
                    @else
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#"
                               id="supportedContentDropdown"
                               data-toggle="dropdown" aria-haspopup="true"
                               aria-expanded="false">{{ auth()->user()->name }}</a>
                            <div class="dropdown-menu" aria-labelledby="supportedContentDropdown">
                                <a class="dropdown-item" href="#">{{ trans('string.profile') }}</a>
                                <a class="dropdown-item" href="#">{{ trans('string.setting') }}</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="{{ url('/logout') }}" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">{{ trans('auth.logout') }}</a>
                                {!! form()->open(['url' => '/logout', 'method' => 'post', 'id' => 'logout-form']) !!}
                                {!! form()->close() !!}
                            </div>
                        </li>
                    @endif
                </ul>
            </div>


</header>
