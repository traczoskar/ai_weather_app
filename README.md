# 🌤 WeatherWise.ai

![Header](/.github/header.png)

Step into a smarter way to plan your day with **WeatherWise.ai**. This app connects to the OpenWeather API to provide current weather data tailored to your location. It integrates with OpenAI's ChatGPT for personalized activity suggestions and attire recommendations, ensuring you're perfectly prepared, no matter the weather.

## 👨🏻‍💻 Check out Demo 

[**Click Here**](https://traczoskar.github.io/ai_weather_app/) 👈

![Data fetching](/.github/weather_wise_dark.gif)

## 🛠 Tech Stack

![React](https://img.shields.io/badge/React-222222.svg?style=for-the-badge&logo=react&logoColor=61dafb)
![OpenAI](https://img.shields.io/badge/OpenAI-222222.svg?style=for-the-badge&logo=openai&logoColor=69D3AC)
![TypeScript](https://img.shields.io/badge/TypeScript-222222.svg?style=for-the-badge&logo=typescript&logoColor=3178C6)
![JavaScript ES6+](https://img.shields.io/badge/JavaScript_ES6+-222222.svg?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/HTML5-222222.svg?style=for-the-badge&logo=html5&logoColor=E34F26)
![CSS3](https://img.shields.io/badge/CSS3-222222.svg?style=for-the-badge&logo=css3&logoColor=1572B6)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-222222.svg?style=for-the-badge&logo=tailwind-css&logoColor=06B6D4)
![Redux](https://img.shields.io/badge/React_Redux-222222.svg?style=for-the-badge&logo=redux&logoColor=764ABC)
![React Router](https://img.shields.io/badge/React_Router-222222.svg?style=for-the-badge&logo=react-router&logoColor=EF2E40)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-222222.svg?style=for-the-badge&logo=react-query&logoColor=FF4154)
![Vite](https://img.shields.io/badge/Vite-222222.svg?style=for-the-badge&logo=vite&logoColor=D553F9)
![NPM](https://img.shields.io/badge/NPM-222222.svg?style=for-the-badge&logo=npm&logoColor=EF2E40)
![Make](https://img.shields.io/badge/Make-222222.svg?style=for-the-badge&logo=make&logoColor=C559F2)

## ✅ Features

📍 **Weather Data**: Get real-time weather data based on your geolocation, ensuring you're always aware of what's outside.

🤖 **ChatGPT Integration**: Receive tailored activity suggestions and dressing advice etc. from ChatGPT, customized to the current weather conditions.

🌍 **Global Reach**: Whether you're in your hometown or traveling abroad, WeatherWise.ai delivers accurate weather forecasts wherever you are.

🌐 **Responsive Design**: Enjoy a seamless experience on any device, thanks to a responsive interface powered by Tailwindcss and Vite.

🔄 **Dynamic Updates**: Weather data is constantly refreshed to provide the most current information, powered by TanStack Query (React Query) for efficient data management.

📱 **User-Friendly Interface**: Navigate easily through a clean, modern UI that makes weather checking intuitive and quick.

🌫️ **Air Quality Index**: Monitor air quality and the presence of harmful pollutants in the air.

📅 **5-Day Forecast**: Plan ahead with a detailed 5-day weather forecast.

🌗 **Theme Switch**: Choose between dark or light mode of UI. By default the app will switch to the preferences set up by your system or your browsers settings.

## 🚀 Integration Details

### <ins>OpenAI Integration</ins> &nbsp;🦾

WeatherWise.ai leverages the power of OpenAI's ChatGPT to provide personalized suggestions. The integration is managed through custom endpoints and webhooks configured in Make.com, ensuring seamless communication and data processing.

![AI Integration](/.github/weather_wise_AI.gif)

### <ins>Weather Data from OpenWeatherMap</ins> &nbsp;🌦

The application fetches real-time weather data from the OpenWeatherMap API. Based on the user's geolocation or browser coordinates, it provides accurate and up-to-date weather information.

### <ins>Air Quality Monitoring</ins> &nbsp;🌬

In addition to weather data, WeatherWise.ai includes an air quality index feature. This provides users with information about the levels of various pollutants, helping them make informed decisions about outdoor activities. This data is also fetched from OpenWeatherMap API.

### <ins>Theme Switch</ins> &nbsp;🌗

WeatherWise.ai reads your system or browser theme preferences and adapts to it. In every moment you can switch between dark and light mode by using dedicated intuitive button placed in the header section (just right to main logo of the app).

![Theme Switch](/.github/weather_wise_light.gif)

## 📖 How to Use

1. **Clone the Repository**: 
    ```sh
    git clone https://github.com/traczoskar/ai_weather_app.git
    cd ai_weather_app
    ```

2. **Install Dependencies**: 
    ```sh
    npm install
    ```

    
3. **Set Up Webhook with Make.com**

4. **Set Up Environment Variables**: 
    - Create a `.env` file in the root directory.
    - Add your OpenWeatherMap API key:
      ```env
      VITE_API_KEY=your_api_key
      ```
    - Add your Make.com WebHook URL:
      ```env
      VITE_MAKE_API_URL=your_webhook_url
      ```

5. **Run the Application**: 
    ```sh
    npm start
    ```
    
To integrate OpenAI responses using Make.com, follow these steps to create a webhook:

   ### Creating a Webhook in Make.com

   1. **Log in to Make.com**: Go to [Make.com](https://www.make.com) and log in to your account.
   2. **Create a New Scenario**:
      - Click the **Create a new scenario** button.
      - Click the **+** button to add a new module.
      - Select **Webhooks** from the list of applications.
      - Choose **Custom webhook** as the triggering event.
      - Click **Add** to create a new webhook.
      - Enter a name for the webhook and click **Save**.
      - Copy the generated webhook URL to your clipboard.

   3. **Configure the Webhook**:
      - In the webhook settings, specify the data structure if needed.
      - Optionally, add validation for incoming data.

   4. **Integrate with OpenAI**:
      - Add another module to your scenario for OpenAI.
      - Configure the OpenAI module to process the incoming data and generate a response.
      - Add a **Webhook Response** module to send the response back to the caller.

   5. **Test the Webhook**:
      - Run the scenario and trigger the webhook by sending a request to the copied URL.
      - Ensure that the scenario processes the request and returns the expected response.
     

## 📬 Feedback

I'd love to hear your thoughts and suggestions! Feel free to open an issue or submit a pull request.

