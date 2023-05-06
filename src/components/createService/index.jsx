import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import refreshToken from "../../services/refreshToken";

function CreateService() {
    const [newName, setNewName] = useState("");
    const [newPrefixe, setNewPrefixe] = useState("");
    const [newLogo, setNewLogo] = useState("");
    const [serviceId, setServiceId] = useState(0)
    const [cachedData, setCachedData] = useState({});
    const [serviceOptions, setServiceOptions] = useState([])
    const [selectedService, setSelectedService] = useState({});
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [accessToken, setAccessToken] = useState(authTokens.access);
    const today = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userData.expirated_date === today) {
            const newAccessToken = await refreshToken(authTokens.refresh)
            setAccessToken(newAccessToken);
        }

        let res = await fetch("http://127.0.0.1:8000/service/crud/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify({
                name: newName,
                prefixe: newPrefixe,
                logo: newLogo,
            }),
        }).then((response) => {
            if (response.ok) {
                Swal.fire(
                    'Created!',
                    'The service was created successfully.',
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
                    text: "An error occurred!"
                })
            }
        });
    };

    useEffect(() => {
        const fetchServices = async () => {
            if (userData.expirated_date === today) {
                const newAccessToken = await refreshToken(authTokens.refresh)
                setAccessToken(newAccessToken);
            }

            if (cachedData.serviceOptions) {
                setServiceOptions(cachedData.serviceOptions)
            } else {
                const response = await fetch("http://127.0.0.1:8000/service/crud/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + accessToken,
                    },
                });
                const data = await response.json();
                setCachedData({ serviceOptions: data.results });
                setServiceOptions(data.results);
            }
        }
        fetchServices();
    }, [authTokens, cachedData, userData])

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

    const updateHandleSubmit = async (e) => {
        e.preventDefault();
        if (userData.expirated_date === today) {
            const newAccessToken = await refreshToken(authTokens.refresh)
            setAccessToken(newAccessToken);
        }
        await fetch(`http://127.0.0.1:8000/service/crud/${serviceId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify(selectedService),
        }).then((response) => {
            if (response.ok) {
                Swal.fire("Updated!", "The service was updated successfully.", "success").then((result) => {
                    if (result.isConfirmed) {
                        location.reload()
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "An error occurred!",
                });
            }
        })
    }

    return (
        <>
            <h1 className="text-md font-semibold text-gray-900 uppercase mt-4">Create Service</h1>
            <div className="card">
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
                    <div className="px-4 py-3 flex justify-between">
                        <button className="boton bg-primary text-light" type="submit">Create</button>
                        <button className="boton bg-primaryDark" onClick={() => navigate('/')}>Cancel</button>
                    </div>
                </form>

            </div>
            <h1 className="text-md font-semibold text-gray-900 uppercase mt-4">Update Service</h1>
            <div className="card">
                <form className="p-4" onSubmit={updateHandleSubmit}>
                    <label className="label" htmlFor="service">
                        Service Name
                        <select id="service" className="input" onChange={handleSelectChange}>
                        <option value="">Select service</option>
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
                    <div className="px-4 py-3 flex justify-between">
                        <button className="boton bg-primary text-light" type="submit">Update</button>
                        <button className="boton bg-primaryDark" onClick={() => navigate('/')}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateService;