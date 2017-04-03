<div class="sidebar sidebar-dark">
    <div class="sidebar-content">
        <a class="sidebar-brand" href="{{ route('dashboard.index') }}">{{ config('app.name') }}</a>
        <h4 class="sidebar-heading">Main</h4>
        <ul class="sidebar-menu sm-condensed" data-toggle="sidebar-collapse">
            <li class="sidebar-menu-item {{ html_helper()->active('dashboard.index') }}">
                <a class="sidebar-menu-button" href="{{ route('dashboard.index') }}">
                    <i class="sidebar-menu-icon material-icons">home</i> Dashboard
                </a>
            </li>
            <li class="sidebar-menu-item {{ html_helper()->active('book.index') }}">
                <a class="sidebar-menu-button" href="{{ route('book.index') }}">
                    <i class="sidebar-menu-icon material-icons">book</i> Book Manage
                </a>
                <ul class="sidebar-submenu sm-active-button-bg">
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" href="index.html">Default</a>
                    </li>
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" href="layout-fluid-sidebar-light.html">Sidebar Light</a>
                    </li>
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" href="layout-fluid-sidebar-multiple.html">Multiple Sidebars</a>
                    </li>
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" href="layout-fixed.html">Fixed Layout</a>
                    </li>
                </ul>
            </li>
            <li class="sidebar-menu-item">
                <a class="sidebar-menu-button" href="#">
                    <i class="sidebar-menu-icon material-icons">assignment</i> Pages
                </a>

            </li>
        </ul>
    </div>
</div>
