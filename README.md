# MuiTube - Demo application for interview

### Features
- User registration and login.
- Sharing YouTube videos.
- Viewing a list of shared videos.
- Real-time notifications for new videos shared.

**Link Demo**: http://103.57.220.141/auth/login

_You should register a new account first before can login and go through app._

## Dependencies

| Operation/ Build Environment | Version |
| ---------------------------- | ------- |
| Node.js                      | 16.20.0 |
| react                        | ^18.2.0 |
| typescript                   | ^4.8.3  |
| tailwindcss                  | ^3.3.1  |
| @mui/material                | ^5.12.0 |
| ...                          |         |

You can see more detaily in `package.json`

## Development

### Install Dependencies

```
npm install
```

### Run

```
npm start
```

### Environment
Please check `.env`

If you run the API on your local environment too, just keep `REACT_APP_API_URL=http://localhost:8080`

Otherwise, if you prefer point to deployed API please change to `REACT_APP_API_URL=http://103.57.220.141`

---
### Material UI - CRA example with Tailwind CSS in TypeScript

The project is based on Material UI template.

#### The idea behind the example

This example demonstrates how you can use [Tailwind CSS](https://tailwindcss.com/) and [Create React App](https://github.com/facebookincubator/create-react-app) together with [Material UI](https://mui.com/material-ui/getting-started/overview).
It includes `@mui/material` and its peer dependencies, including [Emotion](https://emotion.sh/docs/introduction), the default style engine in Material UI v5.
