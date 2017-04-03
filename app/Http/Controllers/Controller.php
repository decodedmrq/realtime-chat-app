<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $viewData = [];

    protected function with($key, $value = null)
    {
        if (is_string($key)) {
            $this->viewData[$key] = $value;
        }
        if (is_array($key)) {
            $this->viewData = array_merge($this->viewData, $key);
        }
        return $this;
    }

    protected function renderView($path, $data = [], $mergeData = [])
    {
        return view($this->getIdentifierName() . '/' . $path, array_merge($this->viewData, $data), $mergeData);
    }

    protected function getIdentifierName()
    {
        return strtolower(str_replace('Controller', '', class_basename($this)));
    }
}
