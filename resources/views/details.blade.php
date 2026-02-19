<!DOCTYPE html>
<html>
<head>
    <title>Деталі квартири</title>
    @vite('resources/css/style.css')
</head>
<body>

<h2>Детальна інформація</h2>

<div class="details">

    Район: {{ $apartment->district }} <br>
    Поверх: {{ $apartment->floor }} <br>
    Площа: {{ $apartment->area }} <br>
    Кімнат: {{ $apartment->rooms }} <br>
    Ціна: {{ $apartment->price }} <br>
    Власник: {{ $apartment->name }} <br>
    Телефон: {{ $apartment->phone }} <br>

    <br>
    <a href="/apartments">Назад</a>
</div>

</body>
</html>
