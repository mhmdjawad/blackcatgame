Game Idea
merge items on table to perform actions in combat or in minigame
example table
-----------------
|a|d|h|a|a|h|a|d|
|d|d|d|a|a|h|a|d|
|a|h|d|a|h|d|a|h|
-----------------
a = attack, h = heal, d = defend

these are simple actions that player can do in combat
however I want to add a mix of elements in the mix also
f = fire, e = earth, w = water, m = wind
-----------------
|a|f|h|a|a|h|f|d|
|d|w|d|a|a|m|a|d|
|w|m|d|e|w|d|f|h|
-----------------

the merge sequence applied will lead to different action 
with different level of power for each
merging 2 level 1attacks 
a + a = a level 2
merging 2 level 2 attacks
a2 + a2 = a level 3
merging 3 level 1 attacks have same effect as merging 2 level 1 attacks
a + a + a = level 3
so the sequence is reduced per say of item merged
as for healing or defence
there will be a stored number for these and merging healing or defence 
will fill that for example defence is 20 and healing is 20
when attacked beyond defence and health is reduced 
healing per second will take place depending on skill level
and it will be deducted per second of stored healing
then merged healing will be refilled
and a max number of healing or defence can be reached if merging above max
to perform an attack a combination of attack and element is needed
a + f = fire element attack
a + w = water element attack
a + e = eath element attack
a + m = wind element attack

number of mergable entities are 3 actions 4 elements
attack 30% of board
defend 10 % of board
heal 10% of board 
element (fire + water + wind + earth) 50% 

attacks in elements may be combined to have stronger effect
fire + earth = make attack stronger
more to be determined

skill tree
a skill tree consist of a multiplier of effect for each merging item
- base attack 
- elements affinity and power
- base health
- healing cap
- defence cap
- scavenge that increase coin gain from defeated mobs
- more skills to be added later

game story
player is spawned near a village, that have houses and townhall, and other buildings
but is empty because of the another world portals, where portals are spawned nearby
and monsters surround the area
player purpose is to find his friends and other villagers and save them
so player go around finding portals and defeating enemies around the portal
then entring the portal to a dungeon, clearing it and saving villagers found there
clearing the dungeon will destroy its portal
there are several dungeon portals scatterd in the map with varying difficulties
the further they are the more difficult things become

mosters
mosters vary from type and abilities
in combat with mobs, the mob have these actions
- attack
- defend
- heal
action speed depend on mob and is done during mob action span (every 10s or 20s or so)
-slime
    - slow and fragile
    - some have elemental abilities ( weak to one strong agains another)
        - water slime weak against fire
        - fire slime, weak against water
        - stone slime, higher hp than water and fire
- zombie
    - low hp, average attack speed
- wolf
    - moderate hp, faster speed
- bear
    - high hp, average attack speed
- golem
    - high hp, average speed
- boss moster
    - very high hp, fast speed
and so on other enemeis can be added
the level of mob affect its abilities
and with increased level increase chance of them having skills

skills that player can have
- double attack (each attack have a second hit with reduced power depending on skill level)
- doge (allow user to doge some of the attacks, increased chances with level)
- greed ( scavenge more coins, increase with level)
- other skills to be added

