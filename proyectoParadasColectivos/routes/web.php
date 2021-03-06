<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/branch','BranchController@getAll');
Route::get('/branch/{id}','BranchController@byId');
Route::post('/branch','BranchController@save');
Route::put('/branch/{id}','BranchController@update');
Route::delete('/branch/{id}','BranchController@delete');


Route::get('/stop','StopController@getAll');
Route::get('/stop/{id}','StopController@byId');
Route::post('/stop','StopController@save');
Route::put('/stop/{id}','StopController@update');
Route::delete('/stop/{id}','StopController@delete');