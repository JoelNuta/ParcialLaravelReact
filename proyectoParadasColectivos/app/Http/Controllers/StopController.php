<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Stop;

class StopController extends Controller
{
    function getAll(){
        return Stop::all();
    }

    function save(Request $Req){
        /*$Req->validate([
            'name'=> 'required|unique:stops|max:191'
        ]);*/
        $Stop = new Stop();
        $Stop->latitude =$Req->latitude;
        $Stop->longitude =$Req->longitude;
        $Stop->name =$Req->name;
        $Stop->branch_id =$Req->branchId;
        $Stop->save();
        return 'ok';
    }

    function update(Request $Req, $id){
        /*$Req->validate([
            'name'=> 'required|unique:stops|max:191'
        ]);*/
        $Stop = Stop::findOrFail($id);
        $Stop->latitude =$Req->latitude;
        $Stop->longitude =$Req->longitude;
        //$Stop->name =$Req->name;
        //$Stop->branch_id =$Req->branch_id;
        $Stop->save();
        return 'ok';
    }

    function delete($id){
        $Stop = Stop::findOrFail($id)->delete();
        return 'ok';
    }
}
