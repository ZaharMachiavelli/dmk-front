import axios from "axios";

export const HOST = 'https://urfuservice.herokuapp.com'

export class ScheduleApi {
  static async getCourses(tag = '') {
    let response = await fetch(`${HOST}/courses${tag}`).then(
      (res) => res.json()
    );
    return response;
  }

  static async getStatistic(year) {
    let response = await fetch(`${HOST}/stat/${year}`).then((res) =>
      res.json()
    );
    return response[0];
  }

  static async getProfession(profession) {
    let response = await fetch(
      `http://127.0.0.1:8000/profession?p=${profession}`
    ).then((res) => res.json());
    return response;
  }

  static async getSkills() {
    let response = await fetch(`${HOST}/skills`).then((res) =>
      res.json()
    );
    return response;
  }

  static async setProfession(data) {
    let response = await fetch("http://127.0.0.1:8000/getprofession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data),
    }).then(res => res.json());
    return response;
  }

  static async getProfessions() {
    let response = await fetch(`${HOST}/professions`).then(res => res.json());
    return response;
  }

  static async getMe() {
    let response = await axios.get(`${HOST}/auth/users/me/`);
    return response.data;
  }

  static async patchInfo(data) {
    
    let formData = new FormData();
    for (let key in data) {
      if(Array.isArray(data[key])) {
        data[key].forEach(el => {
          formData.append(key, el)
        })
      } else {
        formData.append(key, data[key])
      }
    }
    await axios.patch(`${HOST}/auth/users/me/`, formData);
  }

  static async getFavouriteCourses(favourites) {
    let response = await axios.post(`${HOST}/courses`, favourites);
    return response.data;
  }

  static async getPresets(presets) {
    console.log(presets);
    let response = await axios.post(`${HOST}/professions`, presets);
    return response.data;
  }

}

export function getToken() {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; key=`);
  if (parts.length == 2) return parts.pop().split(';').shift();
  return false;
}