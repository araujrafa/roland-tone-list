import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import jsonFile from "./myjsonfile.json";

function App() {
  const [filter, setFilter] = useState(jsonFile);
  const [search, setSearch] = useState("");
  const [localStars, setLocalStars] = useState(
    JSON.parse(localStorage.getItem("stars")) || []
  );

  useEffect(() => {
    if (!search) {
      setFilter(jsonFile);
      console.log("aqui");
      return;
    }

    const jsonFilter = jsonFile.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(jsonFilter);
  }, [search]);

  function addedNewStar(id) {
    const stars = localStorage.getItem("stars");

    if (!stars) {
      setLocalStars([...localStars, id]);

      return localStorage.setItem("stars", `["${id}"]`);
    }

    const parser = JSON.parse(stars);

    if (!parser.includes(id)) {
      parser.push(id);
      localStorage.setItem("stars", JSON.stringify(parser));
      setLocalStars([...localStars, id]);
    }
  }

  function removeNewStar(id) {
    const stars = localStorage.getItem("stars");

    const parser = JSON.parse(stars);
    const findIndex = parser.findIndex((e) => e === id);
    if (findIndex > -1) {
      parser.splice(findIndex, 1);
      localStorage.setItem("stars", JSON.stringify(parser));
      setLocalStars([...parser]);
    }
  }

  return (
    <div className="App container-fluid">
      <div>
        <h3>Stars</h3>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Número</th>
              <th>Timbre</th>
              <th>Categoria</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {localStars &&
              localStars.map((id) =>
                jsonFile.map(
                  (el) =>
                    el.number === id && (
                      <tr key={`${el.number}-${el.id}-${el.name}-star`}>
                        <td>{el.id}</td>
                        <td>{el.number}</td>
                        <td>{el.name}</td>
                        <td>{el.category}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-default"
                            onClick={() => removeNewStar(el.number)}
                          >
                            remove
                          </button>
                        </td>
                      </tr>
                    )
                )
              )}
          </tbody>
        </table>
      </div>
      <p>Buscar</p>
      <input
        className="form-control"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <div>
        <h3>Tone list</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Número</th>
              <th>Timbre</th>
              <th>Categoria</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filter.map((el) => (
              <tr key={`${el.number}-${el.id}-${el.name}`}>
                <td>{el.number}</td>
                <td>{el.name}</td>
                <td>{el.category}</td>
                <td>
                  {!localStars.includes(el.number) && (
                    <button
                      type="button"
                      className="btn btn-default"
                      onClick={() => addedNewStar(el.number)}
                    >
                      star
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
