import React, { PureComponent } from "react";
import "./PaneValidationData.css";
import PaneTitle from "../PaneTitle/PaneTitle.jsx";
import ValidationTabCreateNew from "./ValidationTabCreateNew/ValidationTabCreateNew.jsx";
import ValidationTabUser from "./ValidationTabUser/ValidationTabUser.jsx";

const tempDiv = document.getElementById("measurementArea");

function getStringWidth(str) {
  tempDiv.innerText = str;
  return Math.max(tempDiv.clientWidth, tempDiv.offsetWidth) + 30;
}

export default class PaneValidationData extends PureComponent {
  constructor(props) {
    super(props);
    this.tabContainerRef = React.createRef();
    this.createTabRef = React.createRef();
    this.state = {
      tabs: [],
      selectedTab: "sujeetkrjaiswal",
      tabsToShow: 0,
      showMore: false
    };
    this.createNewTab = this.createNewTab.bind(this);
    this.toggleShowMore = this.toggleShowMore.bind(this);
    // this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.createNewTab({
      name: "Abhishek Govula",
      login: "abhishek"
    });
    this.createNewTab({
      name: "Sujeet Jaiswal",
      login: "sujeetkrjaiswal"
    });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  updateDimensions() {
    this.setState(prevState =>
      this.processTabsForShow(prevState.tabs, prevState.selectedTab)
    );
  }
  toggleShowMore() {
    this.setState(prevState => ({
      showMore: !prevState.showMore
    }));
  }
  createNewTab(user) {
    const userWithWidth = {
      ...user,
      width: Math.min(
        300,
        Math.max(getStringWidth(user.login), getStringWidth(user.name))
      )
    };
    this.setState(prevState =>
      this.processTabsForShow([userWithWidth, ...prevState.tabs], user.login)
    );
  }
  removeTab(event, selectedTab) {
    event.stopPropagation();
    this.setState(prevState => {
      let newSelectedTab = this.state.selectedTab;
      const tabs = prevState.tabs.filter(tab => tab.login !== selectedTab);
      if (this.state.selectedTab === selectedTab) {
        newSelectedTab = tabs.length ? tabs[0].login : "";
      }
      return { tabs, selectedTab: newSelectedTab };
    });
  }
  setSelectedTab(selectedTab) {
    this.setState(prevState =>
      this.processTabsForShow(prevState.tabs, selectedTab)
    );
  }
  processTabsForShow(tabs, selectedTab) {
    const containerWidth = Math.max(
      this.tabContainerRef.current.clientWidth,
      this.tabContainerRef.current.offsetWidth
    );
    const createTabWidth = Math.max(
      this.createTabRef.current.offsetWidth,
      this.createTabRef.current.clientWidth
    );
    // const moreTabWidth = 90;
    const usableSpace = containerWidth - createTabWidth;

    let tabsToShowIndex = -1;
    let totalTabWidth = 0;
    tabs
      .map(t => t.width)
      .forEach((tabWidth, index) => {
        totalTabWidth += tabWidth;
        if (totalTabWidth <= usableSpace) {
          tabsToShowIndex = index;
        }
      });
    if (tabsToShowIndex > tabs.length) {
      tabsToShowIndex -= 1;
    }
    const selectedTabIndex = tabs.findIndex(u => u.login === selectedTab);
    if (tabsToShowIndex === -1 && tabs.length) {
      tabsToShowIndex = 0;
    }

    if (selectedTabIndex !== 0 && selectedTabIndex > tabsToShowIndex) {
      tabs = [...tabs.splice(selectedTabIndex, 1), ...tabs];
      return this.processTabsForShow(tabs, selectedTab);
    }
    return { tabs: [...tabs], selectedTab, tabsToShow: tabsToShowIndex + 1 };
  }

  getUserTab() {
    if (this.state.selectedTab === "") {
      return <ValidationTabCreateNew createNewTab={this.createNewTab} />;
    }
    const tab = this.state.tabs.find(
      tab => tab.login === this.state.selectedTab
    );
    if (tab && tab.name && tab.login) {
      return <ValidationTabUser name={tab.name} login={tab.login} />;
    }
    return null;
  }
  renderVisibleTabs() {
    if (this.state.tabsToShow === 0 || this.state.tabs.length === 0) {
      return null;
    }
    return this.state.tabs.slice(0, this.state.tabsToShow).map(tab => (
      <div
        className={
          "validation-tab " +
          (tab.login === this.state.selectedTab ? "active" : "")
        }
        style={{ width: tab.width + "px" }}
        onClick={() => this.setSelectedTab(tab.login)}
        key={tab.login}
      >
        <div className="text-ellipsis">{tab.name}</div>
        <div className="validation-tab-subtext text-ellipsis">{tab.login}</div>
        <i
          className="material-icons validation-tab-close"
          onClick={event => this.removeTab(event, tab.login)}
        >
          close
        </i>
      </div>
    ));
  }
  renderMoreTabs() {
    if (this.state.tabsToShow < this.state.tabs.length) {
      return (
        <div className="validation-tab" onClick={this.toggleShowMore}>
          <div className="validation-more-tab-text">
            {this.state.tabs.length - this.state.tabsToShow} More
          </div>
          <ul
            className={
              "validation-tab-more-dropdown " +
              (this.state.showMore ? "" : "hidden")
            }
          >
            {this.state.tabs.slice(this.state.tabsToShow).map(tab => (
              <li
                key={tab.login}
                className="validation-tab"
                onClick={() => this.setSelectedTab(tab.login)}
              >
                <div className="text-ellipsis">{tab.name}</div>
                <div className="validation-tab-subtext text-ellipsis">
                  {tab.login}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  }
  render() {
    return (
      <section className={this.props.className}>
        <PaneTitle title="Validation data" />
        <div className="validation-tabs" ref={this.tabContainerRef}>
          {this.renderVisibleTabs()}
          {this.renderMoreTabs()}
          <div
            onClick={() => this.setSelectedTab("")}
            ref={this.createTabRef}
            className={
              "validation-tab validation-add-transaction-tab " +
              (this.state.selectedTab ? "" : "active")
            }
          >
            <i className="material-icons add-icon">add_circle_outline</i>
            <span>Add transaction</span>
          </div>
        </div>
        <div className="tab-details">{this.getUserTab()}</div>
        <div className="submit-btn-container">
          <button className="action-btn submit-btn" type="button">
            Reject
          </button>
        </div>
      </section>
    );
  }
}
