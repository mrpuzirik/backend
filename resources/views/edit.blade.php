<!DOCTYPE html>
<html>
<head>
    <title>Список квартир</title>
    @vite('resources/css/style.css')
</head>
<body>

<div class="page-container">

    <h2>Редагувати квартиру</h2>

    <form method="POST" action="/update/{{ $apartment->id }}">
        @csrf

        <label>Район:</label>
        <input type="text" name="district" value="{{ $apartment->district }}">

        <label>Поверх:</label>
        <input type="number" name="floor" value="{{ $apartment->floor }}">

        <label>Площа:</label>
        <input type="number" name="area" value="{{ $apartment->area }}">

        <label>Кімнат:</label>
        <input type="number" name="rooms" value="{{ $apartment->rooms }}">

        <label>Ціна:</label>
        <input type="number" name="price" value="{{ $apartment->price }}">

        <label>Власник:</label>
        <select name="owner_id">
            @foreach($owners as $owner)
                <option value="{{ $owner->id }}"
                    {{ $apartment->owner_id == $owner->id ? 'selected' : '' }}>
                    {{ $owner->name }}
                </option>
            @endforeach
        </select>

        <button type="submit" class="btn btn-warning">
            Оновити
        </button>
    </form>

</div>

</body>
</html>
