--- 1 . Doel ---

We lossen het probleem op dat Pokemonfans verschillende websites moeten bezoeken om Pokemons te bekijken
Bij ons kan je alle Pokemons in een pokedex vinden.
Bij ons kan je de Pokemons bekijken in een pokedex in plaats van op een lelijke website.

Het doel van ons prototype is om Pokemonfans de mogelijkheid te geven om Pokemons te zoeken.
En om gebruikers Pokemons in animatie te laten zien op een website.
De gebruikers kunnen de Pokemons zoeken door het kaartnummer of de naam van de Pokemon.
De gebruikers kunnen bij het Pokemonoverzicht de Pokemons bekijken in animatie door op de kaart te drukken.
Dit alles doen we op een website die ook echt gebasseerd is op Pokemon.

=== 1 . Doel ===

--- 2 . Wat wel wat niet? ---

Niet {
Klapt niet open zoals een echte pokedex
Heeft niet alle werkende knoppen zoals op een echte Pokedex
Heeft geen geluidseffecten op de Pokemons zoals op een echte pokedex
}

Wel {
Kan Pokemons zoeken door kaartnummer of naam van de Pokemon
kan beschrijvingen en statestieken van de Pokemon bekijken
Kan een foto bekijken van de opgezochte Pokemon
Heeft een bedieningspaneel waarmee je naar de volgende en vorige Pokemon kan
In het overzicht kan je de Pokemons zoeken door de naam in te vullen
In het overzicht kan je Pokemonkaarten bekijken in een animatie
}

=== 2 . Wat wel wat niet? ===

--- 3 . Taken ---
De voorpagina maken
De voorpagina stylen
De Pokedex maken (2e pagina)
De pokedex koppelen aan de PokeAPI
De overzicht pagina maken (3e pagina)
De overzicht pagina stylen

Om onze Pokemon website te maken moeten we onderling te taken goed verdelen.
Goed en veel  communiceren en elkaar helpen als dat nodig is.
Daily stand up houden om te kijken hoe ver we zijn van ons doel en om te kijken of we meer inzet moeten tonen.

=== 3 . Taken ===

--- 4 . Talen ---
De talen die we gebruiken voor onze website zijn:
HTML
CSS
JAVASCRIPT
En als framework gebruiken we Tailwind

=== 4 . Talen ===

--- 5 . Database ---

Berries Table:

Columns:
id (Integer, Primary Key): Unique identifier for each berry.
name (String): The name of the berry (e.g., "cheri").
growth_time (Integer): The time it takes for the berry to grow.
max_harvest (Integer): The maximum number of times the berry can be harvested.
natural_gift_power (Integer): The power of the natural gift associated with the berry.
size (Integer): The size of the berry.
smoothness (Integer): Smoothness attribute of the berry.
soil_dryness (Integer): Soil dryness attribute of the berry.
firmness_id (Integer, Foreign Key): Reference to the firmness table based on the id column.
item_id (Integer, Foreign Key): Reference to the item table based on the id column.
natural_gift_type_id (Integer, Foreign Key): Reference to the type table based on the id column.
Flavors Table:

Columns:
id (Integer, Primary Key): Unique identifier for each flavor.
berry_id (Integer, Foreign Key): Reference to the berries table based on the id column.
potency (Integer): Potency of the flavor associated with the berry.
flavor_id (Integer, Foreign Key): Reference to the berry_flavor table based on the id column.
Firmness Table:

Columns:
id (Integer, Primary Key): Unique identifier for each firmness.
name (String): The name of the firmness (e.g., "soft").
url (String): The URL associated with the firmness.
Type Table:

Columns:
id (Integer, Primary Key): Unique identifier for each type.
name (String): The name of the type (e.g., "fire").
url (String): The URL associated with the type.
Item Table:

Columns:
id (Integer, Primary Key): Unique identifier for each item.
name (String): The name of the item (e.g., "cheri-berry").
url (String): The URL associated with the item.

=== 5 . Database === 

--- 6 . Planning ---

Alperen Maakt de overzicht pagina 
Yusuf Zorgt ervoor dat de PokeAPI is gekoppeld en de Pokemons zichtbaar zijn in de Pokedex
Dimitri Maakt de voorpagina + stylings en knoppen op de website
Ali maakt de Pokedex en zorgt voor de statistieken van de Pokemons in de Pokedex

=== 6 . Planning === 