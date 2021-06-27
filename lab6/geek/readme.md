# Aplikacja 'Dziekanat'

## Informacja

Szanowny Panie Doktorze,

nie udało mi się dokończyć aplikacji (nie ma usuwania oraz update'owania ocen oraz testów). Mam jednak nadzieję, że nie sprawi to, że zadanie zostanie ocenione na 0 punktów.

Z wyrazami szacunku
Tomasz Gargula

## API

dostępne endopointy: 
1. localhost:8080/generate – strona generująca i wstawiająca do bazy studentów i nauczycieli
2. localhost:8080/users – zwraca jsona ze wszystkimi userami
3. localhost:8080/users/add – pozwala stworzyć usera
4. localhost:8080/login – pozwala się zalogować
5. localhost:8080/student/home – pozwala przeglądać oceny, będąc zalogowanym jako student
6. localhost:8080/teacher/home – pozwala przeglądać i wybrać studentów do edycji
7. localhost:8080/teacher/student/:student – pozwala dodać przedmiot studentowi, a także przypisać nową ocenę do odpowiedniego przedmiotu
8. localhost:8080/logout – wylogowuje użytkownika
