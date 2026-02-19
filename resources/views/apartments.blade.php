<!DOCTYPE html>
<html>
<head>
    <title>Список квартир</title>
    @vite('resources/css/style.css')
</head>
<body>

<h1>Список квартир</h1>

<div class="cards-container">
    @foreach($apartments as $apartment)
        <div class="card">
            Район: {{ $apartment->district }} <br>
            Поверх: {{ $apartment->floor }} <br>
            Ціна: {{ $apartment->price }} <br>

            <a href="/apartment/{{ $apartment->id }}">Детальніше</a>
        </div>
    @endforeach
</div>

</body>
</html>
