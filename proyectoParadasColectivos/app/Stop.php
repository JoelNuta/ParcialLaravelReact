<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stop extends Model
{
    function Branch(){
        return $this->belongsTo("App/Branch");

    }
}
