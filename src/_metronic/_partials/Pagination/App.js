import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./styles.css";
import { number } from "prop-types";
const numb = 1;
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      data: [],
      count: 0,
      perPage: 10,
      currentPage: 0,
      // counting:0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  receivedData() {
    console.log("Whole URL is:" + window.location.href);
    var dummyURL = window.location.href;
    var mainURL = "";
    if (dummyURL.includes("/transactions")) {
      //debugger;
      console.log("dummyURL: " + dummyURL);
      mainURL = "http://3.85.238.214/transactions/";
    }

    if (dummyURL.includes("/sales")) {
      //debugger;
      console.log("dummyURL: " + dummyURL);
      mainURL = "http://3.85.238.214/sales/";
    }

    if (dummyURL.includes("/customers")) {
      //debugger;
      console.log("dummyURL: " + dummyURL);
      mainURL = "http://3.85.238.214/customers/";
    }

    axios.get(`${mainURL}`).then((res) => {
      console.log("data belong from :" + mainURL);
      const data = res.data;
      //debugger;
      console.log(data);
      console.log("total attributes are: " + data.count);
      console.log(data.count);

      //this.state.counting=data.count;
      //const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
      // const slice = data.count/this.state.perPage;

      //   const postData = slice.map(pd => <React.Fragment>
      //   <div>
      //       <p>{pd.title}</p>
      //       <img src={pd.thumbnailUrl} alt=""/>
      //   </div>

      //   </React.Fragment>)
      //debugger;
      console.log(data.count);
      this.setState({
        pageCount: Math.ceil(data.count / this.state.perPage),
        counting: data.count,
        perPage: 10,
        // postData
      });
    });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  componentDidMount() {
    this.receivedData();
  }
  render() {
    return (
      <div>
        {this.state.postData}

        <h5>
          Showing {this.state.offset + numb} to {this.state.perPage * numb} from{" "}
          {this.state.data.counting}
        </h5>

        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}
