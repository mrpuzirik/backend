<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ApartmentController extends Controller
{
    public function index(Request $request)
    {
        $sort = $request->get('sort', 'id');

        $allowed = ['id','district','floor','area','rooms','price'];
        if (!in_array($sort, $allowed)) {
            $sort = 'id';
        }

        $apartments = DB::select("
            SELECT apartments.*, owners.name
            FROM apartments
            JOIN owners ON apartments.owner_id = owners.id
            ORDER BY $sort
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

    public function create()
    {
        $owners = DB::select("SELECT * FROM owners");
        return view('create', compact('owners'));
    }

    public function store(Request $request)
    {
        DB::insert("
            INSERT INTO apartments (district, floor, area, rooms, price, owner_id)
            VALUES (?, ?, ?, ?, ?, ?)
        ", [
            $request->district,
            $request->floor,
            $request->area,
            $request->rooms,
            $request->price,
            $request->owner_id
        ]);

        return redirect('/apartments');
    }

    public function edit($id)
    {
        $apartment = DB::selectOne("SELECT * FROM apartments WHERE id = ?", [$id]);
        $owners = DB::select("SELECT * FROM owners");

        return view('edit', compact('apartment', 'owners'));
    }

    public function update(Request $request, $id)
    {
        DB::update("
            UPDATE apartments
            SET district = ?, floor = ?, area = ?, rooms = ?, price = ?, owner_id = ?
            WHERE id = ?
        ", [
            $request->district,
            $request->floor,
            $request->area,
            $request->rooms,
            $request->price,
            $request->owner_id,
            $id
        ]);

        return redirect('/apartments');
    }

    public function destroy($id)
    {
        DB::delete("DELETE FROM apartments WHERE id = ?", [$id]);
        return redirect('/apartments');
    }

}
