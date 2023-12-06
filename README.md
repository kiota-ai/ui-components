# Librería de Componentes en React con Vite y Storebook

Esta es una librería de componentes en React desarrollada utilizando Vite y Storebook. En esta librería, encontrarás un componente llamado `Input` que puedes utilizar para crear campos de entrada personalizables en tus aplicaciones web.

## Componente Input

El componente `Input` te permite crear campos de entrada personalizables para tus aplicaciones React. Viene con las siguientes propiedades y eventos:

### Propiedades

- `value`: El valor actual del campo de entrada.
- `placeholder`: El texto de marcador de posición que se muestra dentro del campo cuando está vacío.
- `label`: La etiqueta descriptiva para el campo de entrada.

### Eventos

- `onChange`: Se dispara cuando el valor del campo de entrada cambia.
- `onInput`: Se dispara cuando se recibe una entrada de usuario en el campo.

## Instalación

Puedes instalar esta librería en tu proyecto utilizando `yarn` o `npm`. Ejecuta el siguiente comando en tu terminal:

```bash
yarn add https://PERSONAL_TOKEN@github.com/kiota-ai/ui-components
```

o

```bash
npm install https://PERSONAL_TOKEN@github.com/kiota-ai/ui-components
```

```
Donde el PERSONAL_TOKEN Es el personal Access Token del usuario de github a quien se le dió acceso a la libreria privada.
```

# Ejemplo Completo

Aquí tienes un ejemplo completo de cómo puedes utilizar el componente Input en tu aplicación:

```jsx
import React, { useState } from "react";
import { Input } from "ui-components-kiota";
import "ui-components-kiota/dist/style.css";

function App() {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	return (
		<div>
			<h1>Componente Input</h1>
			<Input
				value={inputValue}
				placeholder="Ingrese un valor"
				label="Campo de Entrada"
				onChange={handleInputChange}
				onInput={(event) =>
					console.log("Entrada de usuario:", event.target.value)
				}
			/>
		</div>
	);
}

export default App;
```

# Vista Previa en Storybook

Esta librería de componentes también incluye una vista previa en Storybook, que te permite ver y probar los componentes de manera interactiva en un entorno aislado.

Para iniciar Storybook en tu proyecto, ejecuta el siguiente comando:

```bash
yarn storybook
```

o

```bash
npm run storybook
```

¡Ahora estás listo para comenzar a utilizar la librería de componentes en tu proyecto React con Vite y Storybook!

Asegúrate de visitar la [documentación completa](https://docs-storybook-ui.netlify.app) para obtener más información sobre cómo utilizar otros componentes y características de esta librería.
