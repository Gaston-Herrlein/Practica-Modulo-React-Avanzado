# Practica-Modulo-React-Avanzado

👤 Herrlein Gaston

💻 Bootcamp Full Stack Web XVI

📅 24 Junio 2024

## Enunciado del ejercicio:

#### 1. Configurar un store Redux donde se almacenará al menos la siguiente información:

- Información sobre la sesión o el usuario registrado en el sistema (saber si hay un usuario logueado). Al iniciar la aplicación se deberá leer la información del token desde el LocalStorage (si existiese) y se almacenará en el store de Redux el estado correspondiente. Al hacer login guardaremos el estado en el store de Redux (SIEMPRE) y en el Local Storage si se eligió recordar sesion.
- Información sobre los anuncios. El store deberá manejar la obtención de tags disponibles, de anuncios desde el API (listado y detalle), así como la creación y borrado de anuncios.

Será importante modelar correctamente el estado que se va a guardar en el store.

#### 2. Crear las acciones y reducers necesarios para poder cumplir los objetivos del punto 1.

#### 3. Conectar los componentes con el store de redux (connect / hooks)

#### 4. Configurar Redux Dev Tools para simplificar las tareas de debugging de la aplicación.

#### 5. Testing. Crear tests unitarios, dando al menos un ejemplo de cada uno de estos casos.

- Una acción síncrona.
- Una acción asíncrona.
- Un reducer.
- Un selector.
- Un componente con snapshot testing.
- Comprobar el funcionamiento de un componente que ejecuta una acción del store, mockeando la acción.

#### 6. OPCIONAL: Formularios.

La aplicación contiene varios formularios (Login, Creación de anuncios). Estaría bien extraer lógica común a todos ellos y reutilizarlos en los disintos formularios, por ejemplo creando un componente `<Form />` que mantenga los valores del formulario y un `<Input />` que reciba el valor que le corresponde así como la función necesaria para poder modificar ese valor en el evento `onChange`. De ese modo, toda la lógica del `onChange` estará _“escondida”_ en los components **Form** e **Input**. La idea es que luego en el momento de usar estos componentes se pueda hacer así

```jsx
<Form initialValue = {{ email: ‘’, password: ‘’ }} onSubmit = { … } >
    <Input type ="text" name="email" />
    <Input type ="password" name="password" />
</Form>
```

## Resolucion.

Para esta practica se utilizara la practica proporcionada por _@davidjj76_ en el modulo de _Fundamentos de React_

### Índice de contenido:

- [Actions](#Actions)
- [Reducers](#Reducers)
- [Store](#Store)
- [Redux Dev Tools](#ReduxDevTools)
- [Test](#Test)

## Actions

## Reducers

## Store

## ReduxDevTools

## Test
