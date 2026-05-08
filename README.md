# WEB103 Prework - *Creatorverse*

Submitted by: **Nathachanok Netmaneesuk**

About this web app: **Show content creators worthy of thy visits**

Time spent: **15** hours

## Required Features

The following **required** functionality is completed:

<!-- 👉🏿👉🏿👉🏿 Make sure to check off completed functionality below -->
- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [x] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:

- [x] Navigation bar
- [x] Addition of extra social media platforms
- [x] Display of extra social media platforms
- [x] Cancel button for add/edit creator
- [x] Confirmation modal for creator deletion

## Video Walkthrough

Here's a walkthrough of implemented required features:

![Walkthrough of Creatorverse](https://github.com/nathnet/creatorverse/blob/master/walkthrough.gif)

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ScreenToGif
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

First challenge was trying to set up React TypeScript-templated Vite with React Router framework. Since framework is one or another, it took quite a bit of time trying to figure out how to move certain TypeScript options from Vite template to React Router and replacing the styles from TailwindCSS with PicoCSS as they are not functioning the same way (big chunk of time went to how to use Pico's color and SCSS.)
Second challenge was the truncation and adding "Read more". I spent a lot of time trying to figure out what was wrong when the button didn't pop up despite already adding a check through useEffect. It turned out the issue was with the placeholder client call, which was failing, blocking the useEffect from running.

## Appendix

### Time used by commit
1. Read instructions and set up Vite: 1 hour
2. Replace Vite TS template with React Router TS + Supabase: 4.5 hours
3. Set up pages and routes: 0.5 hours
4. Create and stylize CreatorCard: 1 hour
5. Create navbar and hero banner: 0.5 hours
6. Added "Read more" and truncation on CreatorCard: 1.5 hours
7. Updated README.md with CodePath's template: 0.17 hours
8. Created view creator page: 1 hour
9. Connected data loader to Supabase: 1.42 hours
10. Created add a new creator page: 1.5 hours
11. Created edit creator page: 1 hour
12. Added delete creator button: 0.5 hours
13. Populated with creators and screen recording: 0.25 hours

## License

Copyright [2026] [Nathachanok Netmaneesuk]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.