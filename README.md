# Fourmi de LANGTON


## Introduction

La fourmi de Langton est un automate cellulaire bidimensionnel comportant un jeu de règles très simples. On lui a donné le nom de Christopher Langton, son inventeur. 

<p align="center">
![Fourmi de Langton](https://raw.githubusercontent.com/cdivry/fourmi_de_langton/master/img/illustration.png)

*Fourmi de Langton sur une grille initialement vide après plus de 10000 étapes. En haut, on peut voir le début de la « route ». Le pixel rouge montre la position de la fourmi.*
</p>


## Règles

Les cases d'une grille bidimensionnelle peuvent être blanches ou noires. On considère arbitrairement l'une de ces cases comme étant l'emplacement initial de la fourmi. Dans l'état initial, toutes les cases sont de la même couleur.

La fourmi peut se déplacer à gauche, à droite, en haut ou en bas d'une case à chaque fois selon les règles suivantes :
* Si la fourmi est sur une case noire, elle tourne de 90° vers la gauche, change la couleur de la case en blanc et avance d'une case.
* Si la fourmi est sur une case blanche, elle tourne de 90° vers la droite, change la couleur de la case en noir et avance d'une case.

Il est également possible de définir la fourmi de Langton comme un automate cellulaire où la plupart des cases de la grille sont blanches ou noires et où la case de la fourmi peut prendre huit états différents, codant à la fois sa couleur et la direction de la fourmi.



## Attracteur

Ces règles simples conduisent à un comportement étonnant de la fourmi : après une période initiale apparemment chaotique, la fourmi finit par construire une « route » formée par 104 étapes qui se répètent indéfiniment. Il semble que cette route de 104 étapes soit un attracteur de la fourmi de Langton.
Cet attracteur apparaît quand la grille est initialement vide et pour différentes conditions initiales. On conjecture que ce comportement reste vrai pour n'importe quel motif initial fini dessiné sur la grille (c'est par contre faux si on s'autorise un motif infini)



## Edition

Amusez-vous à modifier la taille de la grille :
```var MAP_SIZE = 128;```

... la position de la fourmi :
```var ANT = {x: 32, y: 32, dir: 'bottom'};```

... ou la grille par défaut :
```MAP = MAP.fill(1);```
