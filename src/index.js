import React from "react"
import ReactDOM from "react-dom"

import "./index.css"

const Quote = (props) => {
  return (
    <>
      <div id="text">{props.quote?.content}</div>
      <div id="author">{props.quote?.author}</div>
      <a
        target="_top"
        href={`https://twitter.com/intent/tweet/?text="${props.quote?.content}" - ${props.quote?.author}`}
        id="tweet-quote"
      >
        Tweet
      </a>
      <button id="new-quote" onClick={props.getQuote}>
        New quote
      </button>
    </>
  )
}

class RandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quote: null,
    }

    this.getQuote = this.getQuote.bind(this)
    this.setColor = this.setColor.bind(this)
  }

  async getQuote() {
    await fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((result) => {
        const { content, author } = result

        const newObj = {
          content,
          author,
        }

        this.setState({ quote: newObj })
        this.setColor()
      })
      .catch((err) => console.log("error ", err))
  }

  setColor() {
    const color = ["red", "orange", "green", "blue"]

    const randomColorIndex = Math.floor(Math.random() * color.length)

    document.documentElement.style.setProperty(
      "--color",
      color[randomColorIndex]
    )
  }

  componentDidMount() {
    this.getQuote()
    this.setColor()
  }

  render() {
    return (
      <div id="quote-box">
        <Quote quote={this.state.quote} getQuote={this.getQuote} />
      </div>
    )
  }
}

ReactDOM.render(<RandomQuoteMachine />, document.getElementById("root"))
