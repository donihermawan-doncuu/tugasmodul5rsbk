import React, { Component } from "react";
import axios from "axios";
import { Modal, Row, Col } from "antd";
import "antd/dist/antd.css";
export default class tekkom extends Component {
    constructor(props) {
        super(props);
        this.state = {
        tekkom: [],
        visible: false,
        nama: "",
        asal: "",
        nim: "",
        };
    }

    handleButton = (nama) => {
        alert(nama);
    };
    handleTambahOrang = () => {
        this.setState({
        visible: true,
        });
    };
    handleNama = (e) => {
        this.setState({
        nama: e.target.value,
        });
        console.log(this.state.nama);
    };
    handleNim = (e) => {
        this.setState({
        nim: e.target.value,
        });
        console.log(this.state.nim);
    };
    handleAsal = (e) => {
        this.setState({
            asal: e.target.value,
        });
        console.log(this.state.asal);
    };
    HandleClickImage = () => {
        alert('aaa')
    }
    handleSubmit = () => {
        if (
            this.state.nama !== "" &&
            this.state.nim !== "" &&
            !this.state.asal !== ""
        ) {
            axios({
            method: "post",
            url: "https://backendcatatantugas.herokuapp.com/mahasiswa/add",
            headers: {
                accept: "*/*",
            },
            data: {
                nama: this.state.nama,
                nim: this.state.nim,
                asal: this.state.asal,
            },
            })
        .then((data) => {
            alert("berhasil menambahkan");
            window.location.reload();
        })
        .catch((error) => {
            alert("gagal lur");
        });
        } else {
            alert("pastikan semua kolom terisi");
        }
    };
    componentDidMount() {
        axios({
            method: "get",
            url: "https://picsum.photos/v2/list",
            headers: {
                accept: "*/*",
            },
        })
        .then((data) => {
            console.log(data);
            this.setState({
                tekkom: data.data,
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    render() {
        return (
            <div>
                <div className="boxWhite">
                    <center>
                        <h1>List</h1>
                    </center>
                        <Modal
                        title="Tambah Orang Bosque"
                        centered
                        visible={this.state.visible}
                        onOk={this.handleSubmit}
                        onCancel={() => this.setState({ visible: false })}
                        width={500}
                        >
                    <div style={{ textAlign: "center" }}>
<p>Nama : </p>{" "}
<input
type="text"
placeholder="nama"
onChange={this.handleNama}
/>
<br />
<p>Nim : </p>{" "}
<input type="text" placeholder="nim" onChange={this.handleNim} />
<br />
<p>Asal : </p>{" "}
<input
type="text"
placeholder="asal"
onChange={this.handleAsal}
/>
<br />
</div>
</Modal>
<Row>
{this.state.tekkom.map((results, index) => {
    return (
            <div>
                    <Col>{results.author}</Col>
                    <Col><img src={results.download_url} style={{height:'100px', width:'100px'}}/></Col>
                    <Col>{results.height}</Col>
                    <Col>{results.id}</Col>
                    <Col>{results.width}</Col>
                
            </div>
        );
        })} 
</Row>

        </div>
        </div>
        );
        }
        }
        