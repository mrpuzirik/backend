<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

class ApartmentController extends Controller
{
    public function index()
    {
        $apartments = DB::select("
            SELECT apartments.*, owners.name
            FROM apartments
            JOIN owners ON apartments.owner_id = owners.id
        ");

        return view('apartments', compact('apartments'));
    }

    public function show($id)
    {
        $apartment = DB::selectOne("
            SELECT apartments.*, owners.name, owners.phone
            FROM apartments
            JOIN owners ON apartments.owner_id = owners.id
            WHERE apartments.id = ?
        ", [$id]);

        return view('details', compact('apartment'));
    }
}
