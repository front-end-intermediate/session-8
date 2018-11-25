const rootElement = document.getElementById('root')

const Message = (props) => <div>{props.children}</div>

const elem = (
  <div className="container">
  {/* <Message children="hey there" />
  <Message children="Goodbye world" /> */}
  <Message>Hello world</Message>
  <Message>Bye world</Message>
</div>
)
ReactDOM.render(elem, rootElement)

