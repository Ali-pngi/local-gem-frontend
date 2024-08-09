import { getToken } from './authService.js';

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/places`;

export const index = async () => {
  console.log(BASE_URL);
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const show = async (placeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${placeId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (placeId, formData) => {
  try {
    const res = await fetch(`${BASE_URL}/${placeId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deletePlace = async (placeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${placeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const create = async (formData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const update = async (placeId, formData) => {
  try {
    const res = await fetch(`${BASE_URL}/${placeId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserPlaces = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch user places');
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
