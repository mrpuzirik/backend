<!DOCTYPE html>
<html>
<head>
    <title>Список квартир</title>
    @vite('resources/css/style.css')
</head>
<body>

<div class="page-container">

    <h2>Додати квартиру</h2>

    <form method="POST" action="/store">
        @csrf

        <label>Район:</label>
        <input type="text" name="district">

        <label>Поверх:</label>
        <input type="number" name="floor">

        <label>Площа:</label>
        <input type="number" name="area">

        <label>Кімнат:</label>
        <input type="number" name="rooms">

        <label>Ціна:</label>
        <input type="number" name="price">

        <label>Власник:</label>
        <select name="owner_id">
            @foreach($owners as $owner)
                <option value="{{ $owner->id }}">{{ $owner->name }}</option>
            @endforeach
        </select>

        <button type="submit" class="btn btn-success">
            Зберегти
        </button>
    </form>

</div>

</body>
</html>
