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

    public function statistics()
    {
        $ownersCount = DB::selectOne("SELECT COUNT(*) as count FROM owners");
        $apartmentsCount = DB::selectOne("SELECT COUNT(*) as count FROM apartments");

        $ownersLastMonth = DB::selectOne("
        SELECT COUNT(*) as count
        FROM owners
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
    ");

        $apartmentsLastMonth = DB::selectOne("
        SELECT COUNT(*) as count
        FROM apartments
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
    ");

        $lastOwner = DB::selectOne("
        SELECT * FROM owners
        ORDER BY created_at DESC
        LIMIT 1
    ");

        $topOwner = DB::selectOne("
        SELECT owners.name, COUNT(apartments.id) as apartments_count
        FROM owners
        LEFT JOIN apartments ON owners.id = apartments.owner_id
        GROUP BY owners.id, owners.name
        ORDER BY apartments_count DESC
        LIMIT 1
    ");

        return view('statistics', compact(
            'ownersCount',
            'apartmentsCount',
            'ownersLastMonth',
            'apartmentsLastMonth',
            'lastOwner',
            'topOwner'
        ));
    }

    public function search(Request $request)
    {
        $keyword = $request->get('keyword');
        $min = $request->get('min_price');
        $max = $request->get('max_price');

        $sql = "
        SELECT apartments.*, owners.name
        FROM apartments
        JOIN owners ON apartments.owner_id = owners.id
        WHERE 1=1
    ";

        $params = [];

        if ($keyword) {
            $sql .= " AND (district LIKE ? OR owners.name LIKE ?
            OR CAST(floor AS CHAR) LIKE ? OR CAST(rooms AS CHAR) LIKE ?)";
            $params[] = "%$keyword%";
            $params[] = "%$keyword%";
            $params[] = "%$keyword%";
            $params[] = "%$keyword%";
        }

        if ($min && $max) {
            $sql .= " AND price BETWEEN ? AND ?";
            $params[] = $min;
            $params[] = $max;
        }
        elseif ($min) {
            $sql .= " AND price >= ?";
            $params[] = $min;
        }
        elseif ($max) {
            $sql .= " AND price <= ?";
            $params[] = $max;
        }

        $apartments = DB::select($sql, $params);

        return view('apartments', compact('apartments'));
    }
}
