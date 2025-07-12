import axios from "axios";

export function getRichEditorListAPI() {
  return axios({
    method: "GET",
    url: "/rich-text",
  });
}

export function getRichEditorByIdAPI(id) {
  return axios({
    method: "GET",
    url: `/rich-text/${id}`,
  });
}

export function updateRichEditorByIdAPI(id, data) {
  return axios({
    method: "PUT",
    url: `/rich-text/${id}`,
    data,
  });
}

export function uploadFileAPI(data) {
  return axios({
    method: "POST",
    url: `/upload`,
    data,
  });
}
