<!DOCTYPE html>
<html>
<head>
    <title>Список квартир</title>
    @vite('resources/css/style.css')
</head>
<body>

<div class="page-container">

    <div class="top-bar">
        <h1>Список квартир</h1>

        <a href="/create" class="btn btn-success">
            Створити квартиру
        </a>
    </div>

    <div style="margin-bottom:20px;">
        <a href="/apartments?sort=price" class="btn btn-primary">
            Сортувати по ціні
        </a>
        <a href="/apartments?sort=area" class="btn btn-primary">
            Сортувати по площі
        </a>
    </div>

    <div class="cards-container">
        @foreach($apartments as $apartment)
            <div class="card">
                <strong>Район:</strong> {{ $apartment->district }} <br>
                <strong>Поверх:</strong> {{ $apartment->floor }} <br>
                <strong>Ціна:</strong> {{ $apartment->price }} <br><br>

                <a href="/apartment/{{ $apartment->id }}" class="btn btn-primary">
                    Детальніше
                </a>

                <a href="/edit/{{ $apartment->id }}" class="btn btn-warning">
                    Редагувати
                </a>

                <a href="/delete/{{ $apartment->id }}" class="btn btn-danger">
                    Видалити
                </a>
            </div>
        @endforeach
    </div>

</div>

</body>
</html>
