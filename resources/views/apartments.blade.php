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

        <a href="/statistics" class="btn btn-primary">
            Статистика
        </a>
        <a href="/create" class="btn btn-success">
            Створити квартиру
        </a>
    </div>

    <form method="GET" action="/search" class="search-form">

        <input type="text" name="keyword" placeholder="Ключове слово">

        <input type="number" name="min_price" placeholder="Мін. ціна">

        <input type="number" name="max_price" placeholder="Макс. ціна">

        <button type="submit" class="btn btn-primary">
            Пошук
        </button>

    </form>

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
