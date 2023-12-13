# Librería de Componentes en React con Vite y Storebook

## Instalación

Puedes instalar esta librería en tu proyecto utilizando `yarn` o `npm`. Ejecuta el siguiente comando en tu terminal:

```bash
yarn add https://PERSONAL_TOKEN@github.com/kiota-ai/ui-components
```

o

```bash
npm install git+https://PERSONAL_TOKEN@github.com/kiota-ai/ui-components
```

```
Donde el PERSONAL_TOKEN Es el personal Access Token del usuario de github a quien se le dió acceso a la libreria privada.
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

# Creación de un Nuevo Componente

## Paso 1: Crear un Nuevo Componente

1. Crea el nuevo componente en `src/lib/components/ui/atoms/Button.tsx`.

```tsx
// src/lib/components/ui/atoms/Button.tsx
import React, { FC } from "react";

export interface ButtonsProps {
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	width?: string;
	verticalMargin?: string;
	vertical?: string;
	horizontal?: string;
	marginRight?: string;
	marginLeft?: string;
	bgColor?: string;
	textColor?: string;
	bgHoverColor?: string;
	borderColor?: string;
	textColorHover?: string;
	icon?: string;
	iconComponent?: React.ReactNode;
	text?: string;
	disabled?: boolean;
	textSize?: string;
	weight?: string;
	shadow?: string;
	iconWidth?: string;
	textAlign?: string;
	className?: string;
}

export const Button: FC<ButtonsProps> = ({
	onClick,
	type,
	width = "full",
	verticalMargin = "5",
	vertical = "2.5",
	horizontal = "7",
	marginRight = "0",
	marginLeft = "0",
	bgColor = "transparence-blue",
	textColor = "blue-dark",
	bgHoverColor,
	borderColor,
	textColorHover,
	icon,
	iconComponent,
	text,
	disabled,
	textSize = "sm",
	weight = "semibold",
	shadow = "soft-white",
	iconWidth = "auto",
	textAlign = "center",
	className = "",
}) => {
	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disabled}
			className={`${
				textAlign === "center"
					? "text-center"
					: textAlign === "right"
					? "text-right"
					: "text-left"
			} 
        block w-${width} my-${verticalMargin} mr-${marginRight} ml-${marginLeft} py-${vertical} px-${horizontal} 
        text-${textSize} font-${weight} text-${textColor} placeholder-gray bg-${bgColor} rounded-2xl 
        shadow-${shadow} cursor-pointer transition-all duration-500 ease-in-out 
        hover:bg-${bgHoverColor} hover:border-${borderColor} hover:text-${textColorHover} hover:shadow-hover
        ${borderColor && `border border-${borderColor}`}
        focus:outline-none hover:shadow-inner ${className}`}
		>
			{icon && (
				<img
					src={icon}
					alt="Icon"
					className={`inline | mr-2 | w-${iconWidth} `}
				/>
			)}

			{iconComponent && iconComponent}

			{text}
		</button>
	);
};
```

## Paso 2: Importar en src/lib/components/index.ts

2.1. Abre o crea el archivo src/lib/components/index.ts.

2.2. Importa y exporta el nuevo componente.

```tsx
// src/lib/components/index.ts
export * from "./ui/atoms/Button";
```

## Paso 3: Documentar con Storybook

3.1. Crea un nuevo archivo de historias en
`src/lib/components/ui/atoms/Button.stories.tsx.`

```tsx
// src/lib/components/ui/atoms/Button.stories.tsx
import { Meta, Story } from "@storybook/react";
import { Button, ButtonsProps } from "./Button";

export default {
	title: "Button",
	component: Button,
} as Meta;

const Template: Story<ButtonsProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	text: "Click me",
	onClick: () => console.log("Button clicked"),
};

export const CustomStyles = Template.bind({});
CustomStyles.args = {
	text: "Custom Styled Button",
	bgColor: "red",
	textColor: "white",
	bgHoverColor: "darkred",
	borderColor: "darkred",
	textColorHover: "white",
};
```

## Paso 4: Compilar la Documentación de Storybook

1. Ejecuta el siguiente comando para compilar la documentación con Storybook.

```bash
yarn build-storybook
```

## Paso 5: Compilar la Aplicación

1. Ejecuta el siguiente comando para compilar la aplicación.

```bash
yarn build
```

## Uso del componente:

1. Para usar el componente se hace se la siguiente manera:

```tsx
import { Button } from "ui-components-kiota";
```
