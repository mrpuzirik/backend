<!DOCTYPE html>
<html>
<head>
    <title>Статистика</title>
    @vite('resources/css/style.css')
</head>
<body>

<div class="page-container">

    <h1>Статистика</h1>

    <div class="details">

        <p><strong>Всього власників:</strong> {{ $ownersCount->count }}</p>
        <p><strong>Всього квартир:</strong> {{ $apartmentsCount->count }}</p>

        <hr>

        <p><strong>Власників за останній місяць:</strong> {{ $ownersLastMonth->count }}</p>
        <p><strong>Квартир за останній місяць:</strong> {{ $apartmentsLastMonth->count }}</p>

        <hr>

        <p><strong>Останній доданий власник:</strong>
            {{ $lastOwner->name ?? 'Немає даних' }}
        </p>

        <hr>

        <p><strong>Власник з найбільшою кількістю квартир:</strong>
            {{ $topOwner->name ?? 'Немає даних' }}
            ({{ $topOwner->apartments_count ?? 0 }} квартир)
        </p>

    </div>
    <a href="/" class="btn btn-primary">
        На головну
    </a>
</div>

</body>
</html>
