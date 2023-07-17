import React from 'react';
import moment from 'moment';
import TransacService from "../services/TransactionService";
import {
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
import Paper from '@mui/material/Paper';
import './styles.css'

export default function Home() {
    const [saldoTotalPeriodo, setSaldoTotalPeriodo] = React.useState("");
    const [initialDate, setInitialDate] = React.useState("");
    const [saldoTotal, setSaldoTotal] = React.useState("");
    const [totalPages, setTotalPages] = React.useState(0);
    const [endDate, setEndDate] = React.useState("");
    const [search, setSearch] = React.useState("");
    const [rows, setRows] = React.useState([]);
    const [page, setPage] = React.useState(1);
    

    const fetchData = async () => {
        const result = await TransacService.getAlltransactions(search, initialDate ? initialDate + "T00:00:00Z" : "",
        endDate ? endDate + "T23:59:59Z" : "", page - 1);

        setSaldoTotal(result?.data?.saldoTotal)
        setSaldoTotalPeriodo(result?.data?.saldoTotalPeriodo)
        setTotalPages(result?.data?.totalPages);
        setRows(
            result?.data?.transferencias?.content.map((item) => {
                return {
                id: item?.id,
                dataTransferencia: item?.dataTransferencia,
                valor: item?.valor,
                tipo: item?.tipo == "TRANSFERENCIA" ? item?.tipo + obterTipoDeTransferencia(item?.valor) : item?.tipo,
                nomeOperadorTransacao: item?.nomeOperadorTransacao,
                };
            })
        );
    };

    function obterTipoDeTransferencia(valor) {
        if (valor >= 0) {
          return " ENTRADA";
        } else {
          return " SAÍDA";
        }
      }

    React.useEffect(() => {
        fetchData();
    }, [page]);

    const handleSearch = () => {
        setPage(1);
        fetchData();
    };

return (
    <>
    <div className="wrapper">
       <div className="home-container">
                <div>
                        <div className="home-subtitle">
                            <div className="box-input">
                                <label className="label-input">Data de Início</label>
                                <input type="date" className="inputs" value={initialDate} onChange={(e) => setInitialDate(e.target.value)}></input>
                            </div>

                            <div className="box-input">
                                <label className="label-input">Data de Fim</label>
                                <input type="date" className="inputs" value={endDate} onChange={(e) => setEndDate(e.target.value)}></input>
                            </div>

                            <div className="box-input">
                                <label className="label-input">Nome operador transacionado</label>
                                <input data-testid="nome-operador" type="text" className="inputs" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                            </div>
                            
                        </div>

                        <div className="pesquisar">
                            <button className="button-pesquisar" onClick={handleSearch}>
                                    Pesquisar
                            </button>
                        </div>
                </div>

                <div className="centralizar">
                    <TableContainer sx={{ width: "100%" }} component={Paper}>
                        <Table stickyHeader aria-label="sticky table">

                        <TableHead >
                        
                            <TableRow>
                                <TableCell colSpan={4} >
                                    Saldo total: {saldoTotal} Saldo no período R$ {saldoTotalPeriodo}
                                </TableCell>
                            </TableRow>
                            
                                <TableRow >
                                        <TableCell sx={{ width: "16%", border: "solid #808080 0.5px", fontWeight: "bold" }}>
                                            Dados
                                        </TableCell>
                                        <TableCell sx={{ width: "25%", border: "solid #808080 0.5px", fontWeight: "bold" }}>
                                            Valentia
                                        </TableCell>
                                        <TableCell sx={{ width: "25%", border: "solid #808080 0.5px", fontWeight: "bold" }}>
                                            Tipo
                                        </TableCell>
                                        <TableCell sx={{ width: "50%", border: "solid #808080 0.5px", fontWeight: "bold" }}>
                                            Nome operador transacionado
                                        </TableCell>
                                </TableRow>
                            
                        </TableHead>

                        <TableBody>
                            {rows.length > 0 &&
                            rows.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{moment(item.dataTransferencia).format('YYYY-MM-DD')}</TableCell>
                                    <TableCell >{item.valor}</TableCell>
                                    <TableCell >{item.tipo}</TableCell>
                                    <TableCell >{item.nomeOperadorTransacao}</TableCell>
                                </TableRow>
                            ))}
                            {rows.length === 0 && (
                            <TableRow>
                                <TableCell
                                colSpan={5}
                                sx={{ textAlign: "center" }}
                                >
                                Nenhum resultado encontrado
                                </TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                        </Table>

                    <div className='centralizar'>
                        <Pagination
                            showFirstButton showLastButton
                            size="small"
                            count={totalPages}
                            page={page}
                            onChange={(e, newPage) => setPage(newPage)}
                        />
                    </div>
                    </TableContainer>
                    </div>
            </div>
        </div>
    </>
    );
}