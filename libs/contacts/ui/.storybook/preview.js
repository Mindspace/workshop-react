import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

// Load required SCSS for all UI components
import '!style-loader!css-loader!sass-loader!./scss-loader.scss';

addDecorator(withKnobs);