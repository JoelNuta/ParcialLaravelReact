<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Branch;

class BranchController extends Controller
{
    function getAll(){
        $Branch = Branch::all();
        foreach ($Branch as $br) {
            $br->stops;
        }
        return $Branch;
    }
    
    function byId($id){
        $Branch = Branch::findOrFail($id);
        $Branch->stops;
        return $Branch;
    }

    function save(Request $Req){
        $Req->validate([
            'name'=> 'required|unique:branches|max:191'
        ]);
        $Branch = new Branch();
        $Branch->name =$Req->name;
        $Branch->save();
        return 'ok';
    }

    function update(Request $Req, $id){
        $Req->validate([
            'name'=> 'required|unique:branches|max:191'
        ]);
        $Branch = Branch::findOrFail($id);
        $Branch->name =$Req->name;
        $Branch->save();
        return 'ok';
    }

    function delete($id){
        $Branch = Branch::findOrFail($id)->delete();
        return 'ok';
    }
}
