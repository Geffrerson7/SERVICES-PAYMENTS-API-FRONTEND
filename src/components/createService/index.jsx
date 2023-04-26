import { useEffect, useState } from "react";

function CreateService() {
    const [newName, setNewName] = useState("");
    const [newPrefixe, setNewPrefixe] = useState("");
    const [newLogo, setNewLogo] = useState("");
    const [serviceId, setServiceId] = useState(0)
    const [cachedData, setCachedData] = useState({});
    const [serviceOptions, setServiceOptions] = useState([])
    const [selectedService, setSelectedService] = useState({});
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://127.0.0.1:8000/service/crud/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + authTokens?.access
                },
                body: JSON.stringify({
                    name: newName,
                    prefixe: newPrefixe,
                    logo: newLogo,
                }),
            }).then((response) => {
                if (response.ok) {
                    Swal.fire(
                        '¡Creado!',
                        'Los datos se guardaron correctamente',
                        'success'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: 'Oops...',
                        text: "¡Ocurrió un error!"
                    })
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchServices = async () => {
            if (cachedData.serviceOptions) {
                setServiceOptions(cachedData.serviceOptions)
            } else {
                const response = await fetch("http://127.0.0.1:8000/service/crud/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + authTokens?.access,
                    },
                });
                const data = await response.json();
                setCachedData({ serviceOptions: data.results });
                setServiceOptions(data.results);
            }
        }
        fetchServices();
    }, [authTokens, cachedData])

    const handleSelectChange = (event) => {
        const selectedId = parseInt(event.target.value);
        const selectedService = serviceOptions.find(service => service.id === selectedId);
        setServiceId(selectedService.id)
        setSelectedService(selectedService || {});
    }

    const handleInputChange = (event) => {

        const { value, name } = event.target;
        
        setSelectedService((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        
      };
      
      

    let updateHandleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`http://127.0.0.1:8000/service/crud/${serviceId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + authTokens?.access,
            },
            body: JSON.stringify(selectedService),
        }).then((response) => {
            if (response.ok) {
                Swal.fire("¡Actualizado!", "Los datos se actualizaron correctamente", "success").then((result) => {
                    if (result.isConfirmed) {
                        location.reload()
                    }
                });
            } else {
                
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "¡Ocurrió un error!",
                });
            }
        })
    }

    return (
        <>
            <div className="card">
                <h1>Create Service</h1>
                <form className="p-4" onSubmit={handleSubmit}>
                    <label className="label">
                        Name
                        <input
                            type="string"
                            className="input"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </label>
                    <label className="label">
                        Prefixe
                        <input
                            type="string"
                            className="input"
                            value={newPrefixe}
                            onChange={(e) => setNewPrefixe(e.target.value)}
                        />
                    </label>
                    <label className="label">
                        Logo
                        <input
                            type="string"
                            className="input"
                            value={newLogo}
                            onChange={(e) => setNewLogo(e.target.value)}
                        />
                    </label>
                    <div className="botones">
                        <button className="boton boton--negro" type="submit">Create</button>
                        <button className="boton boton--gris">Cancel</button>
                    </div>
                </form>

            </div>
            <div className="card">
                <h1>Update Service</h1>
                <form className="p-4" onSubmit={updateHandleSubmit}>
                    <label className="label" htmlFor="service">
                        Service Name
                        <select id="service" className="input" onChange={handleSelectChange}>
                            {serviceOptions.map((option) => (<option key={option.id} value={option.id}>{option.name}</option>))}
                        </select>
                    </label>

                    {selectedService && (
                        <>
                            <label className="label" htmlFor="name">
                                Name
                                <input
                                    id="name"
                                    name="name"
                                    type="string"
                                    className="input"
                                    onChange={(e) => handleInputChange(e, 'name')}
                                    defaultValue={selectedService.name}
                                />
                            </label>
                            <label className="label" htmlFor="prefixe">
                                Prefixe
                                <input
                                    id="prefixe"
                                    name="prefixe"
                                    type="string"
                                    className="input"
                                    onChange={(e) => handleInputChange(e, 'prefixe')}
                                    defaultValue={selectedService.prefixe}
                                />
                            </label>
                            <label className="label" htmlFor="logo">
                                Logo
                                <input
                                    id="logo"
                                    name="logo"
                                    type="string"
                                    className="input"
                                    onChange={(e) => handleInputChange(e, 'logo')}
                                    defaultValue={selectedService.logo}
                                />
                            </label>

                        </>
                    )}
                    <div className="botones">
                        <button className="boton boton--negro" type="submit">Update</button>
                        <button className="boton boton--gris">Cancel</button>
                    </div>
                </form>

            </div>
        </>
    );
}

export default CreateService;