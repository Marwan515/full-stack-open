import { useEffect, useState } from "react";
import requestService from "../services/requests";

export const useResource = (url) => {
  const [resource, setResource] = useState([])
  const [updateResource, setUpdate] = useState(1)
  const baseUrl = url

  useEffect(() => {
    requestService.getAll(baseUrl).then(res => {
      setResource(res)
    })

  }, [updateResource])

  const create = async (data) => {
    await requestService.create(baseUrl, data)
    setUpdate(updateResource + 1)
  }

  const update = async (id, data) => {
    await requestService.update(baseUrl, id, data)
    setUpdate(updateResource + 1)
  }

  const service = {
    create,
    update
  }

  return [
    resource, service
  ]

}