import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import allEvents from "../services/allEvents";
import getUnsplashImage from "../services/unSplash";
import Modal from "../components/Modal";
import EventModal from "../components/EventModal";
import getRecommendedEvents from "../services/getRecommendedEvents";

const EventsPage = () => {
  const [eventosConImagen, setEventosConImagen] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterData, setFilterData] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [msgEvent, setMsgEvent] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (msgEvent) {
      const timer = setTimeout(() => {
        setMsgEvent(null);
      }, 2000); // 5000 ms = 5 segundos
      return () => clearTimeout(timer);
    }
  }, [msgEvent]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allEvents();
        const eventosConImagenTemp = await Promise.all(
          response.map(async (evento) => {
            const imagen = await getUnsplashImage(evento.titulo);
            return { ...evento, imagen };
          })
        );
        setEventosConImagen(eventosConImagenTemp);
      } catch (error) {
        setEventosConImagen([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRecommendedEvents(user.id);
        const eventosConImagenTemp = await Promise.all(
          response.map(async (evento) => {
            const imagen = await getUnsplashImage(evento.titulo);
            return { ...evento, imagen };
          })
        );
        setRecommendations(eventosConImagenTemp);
      } catch (error) {
        setRecommendations([]);
      }
    };
    fetchData();
  }, [user.id, msgEvent]);

  useEffect(() => {
    const filtered = eventosConImagen.filter((item) => {
      const titleMatch = item.titulo.toLowerCase().includes(busqueda.toLowerCase()) || busqueda === "" || item.categoria.some(categoriaItem =>
        categoriaItem.toLowerCase().includes(busqueda.toLowerCase())
      );
      return titleMatch;
    });

    setFilterData(filtered);
  }, [busqueda, eventosConImagen]);



  const handleCreateEventClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateEvent = (newEvent) => {
    setEventosConImagen([
      ...eventosConImagen,
      { ...newEvent, id: eventosConImagen.length + 1, imagen: "" },
    ]);
    setShowModal(false);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
  };

  const handleEditEvent = () => {
    alert("Editar evento");
  };

  return (
    <div className="">
      <Sidebar />
      <div className="flex-grow p-4 pt-28">
        <div className="flex justify-end mb-10">
          <input type="text" placeholder="Busqueda" className="w-3/4 h-10 mr-4 p-2 border border-black rounded-md w-full" value={busqueda} onChange={e => setBusqueda(e.target.value)} />
          {user && user.rol === "ADMIN" && (
            <button
              onClick={handleCreateEventClick}
              className="w-36 h-10 border bg-blue-900 text-white font-semibold hover:bg-blue-700 rounded-lg flex justify-center items-center">
              Crear Evento
            </button>
          )}
        </div>
        <section>
          {recommendations.length > 0 && (
              <h1 className="text-2xl font-semibold text-center mb-10">
                Eventos recomendados
              </h1>
          )}
          {recommendations.length > 0 && (
              <div className="flex flex-wrap justify-center">
                {recommendations.map((evento) => {
                  const { lugarDelEvento } = evento;
                  const city = lugarDelEvento?.city || 'Unknown City';
                  const name = lugarDelEvento?.name || 'Unknown Venue';
                  const direccion = lugarDelEvento?.direccion || 'Unknown Address';

                  return (
                      <div
                          key={evento.id}
                          className="lg:flex lg:w-3/4 md:w-full p-4 w-full h-64 rounded-lg shadow-lg border hover:scale-105 transition-all mx-4 mb-8"
                          onClick={() => handleEventClick(evento)}
                      >
                        <div className="lg:w-1/3 relative rounded overflow-hidden">
                          <img
                              className="object-cover object-center w-full h-full block"
                              src={evento.imagen || "default-image-url.jpg"}
                              alt={evento.titulo}
                          />
                        </div>
                        <div className="lg:w-2/3 lg:pl-8 mt-4 lg:mt-0">
                          <div className="flex items-center gap-5 justify-between mb-4">
                            <h2 className="text-black text-xs tracking-widest title-font mb-1">
                              {evento.fecha}
                            </h2>
                          </div>
                          <h2 className="text-black title-font text-3xl font-medium hover:text-hover-orange">
                            {evento.titulo}
                          </h2>
                          <p className="mt-1 text-lg truncate-multiline">{evento.descripcion}</p>
                          <p className="mt-1 text-lg">{evento.lugarDelEvento.city}, {evento.lugarDelEvento.name}</p>
                          <p className="mt-1 text-lg">{evento.lugarDelEvento.direccion}</p>
                        </div>
                      </div>
                  );
                })}
              </div>
          )}
        </section>
        <h1 className="text-2xl font-semibold text-center mb-10">Eventos</h1>
        {Array.isArray(eventosConImagen) && eventosConImagen.length > 0 ? (
            <div className="flex flex-wrap justify-center">
              {filterData.map((evento) => {
                const { lugarDelEvento } = evento;
                const city = lugarDelEvento?.city || 'Unknown City';
                const name = lugarDelEvento?.name || 'Unknown Venue';
                const direccion = lugarDelEvento?.direccion || 'Unknown Address';

                return (
                    <div
                        key={evento.id}
                        className="lg:flex lg:w-3/4 md:w-full p-4 w-full h-72 rounded-lg shadow-lg border hover:scale-105 transition-all mx-4 mb-8"
                        onClick={() => handleEventClick(evento)}
                    >
                      <div className="lg:w-1/3 relative rounded overflow-hidden">
                        <img
                            className="object-cover object-center w-full h-full block"
                            src={evento.imagen || "default-image-url.jpg"}
                            alt={evento.titulo}
                        />
                      </div>
                      <div className="lg:w-2/3 lg:pl-8 mt-4 lg:mt-0">
                        <div className="flex items-center gap-5 justify-between mb-4">
                          <h2 className="text-black text-xs tracking-widest title-font mb-1">
                            {evento.fecha}
                          </h2>
                        </div>
                        <h2 className="text-black title-font text-3xl font-medium hover:text-hover-orange">
                          {evento.titulo}
                        </h2>
                        <p className="mt-1 text-lg truncate-multiline">{evento.descripcion}</p>
                        <p className="mt-1 text-lg">{city}, {name}</p>
                        <p className="mt-1 text-lg">{direccion}</p>
                      </div>
                    </div>
                );
              })}
            </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">
            No hay eventos disponibles
          </p>
        )}
        <Modal
          show={showModal}
          onClose={handleCloseModal}
          onCreate={handleCreateEvent}
        />
        {selectedEvent && (
          <EventModal
            show={showEventModal}
            onClose={handleCloseEventModal}
            event={selectedEvent}
            onEdit={handleEditEvent}
            onMsg={setMsgEvent}
          />
        )}
      </div>
      {msgEvent && (
        <div
          className={`fixed text-center right-0 bottom-0 mb-10 mr-10 block w-[250px] p-4 text-base leading-5 text-white ${msgEvent === "Anulación exitosa" ? "bg-red-500" : "bg-green-500"
            } rounded-lg opacity-100 font-regular`}
        >
          {msgEvent}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
