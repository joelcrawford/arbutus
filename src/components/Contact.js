import React from 'react'
import '../assets/sass/arbutus/contact.scss'
export default ({anchor}) => {
    return (
        <section id={anchor}>
            <header>
                <h2>Get in touch</h2>
            </header>
            <div className="content">
            <p><strong>We want to hear from you.</strong> Get in touch about tour dates, music 
            whatever else you say here to your peeps.</p>
            <ul className="items">
                <li>
                    <h3>Email</h3>
                    <a href="mailto:arbutusmusicvan@gmail.com">arbutusmusicvan@gmail.com</a>
                </li>
                <li>
                    <h3>Elsewhere</h3>
                    <ul className="icons">
                        <li>
                            <a 
                                href="https://www.facebook.com/arbutusmusicvan/" 
                                className="icon brands fa-facebook-f"
                                target="_blank"
                                rel="noopener noreferrer">
                                <span className="label">Facebook</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.instagram.com/arbutusmusicvan/" 
                                className="icon brands fa-instagram"
                                target="_blank"
                                rel="noopener noreferrer">
                                <span className="label">Instagram</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
                {/* <p><strong>Auctor commodo</strong> interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque venenatis dolor imperdiet dolor mattis sagittis.</p>
                <form>
                    <div className="fields">
                        <div className="field half">
                            <input type="text" name="name" id="name" placeholder="Name" />
                        </div>
                        <div className="field half">
                            <input type="email" name="email" id="email" placeholder="Email" />
                        </div>
                        <div className="field">
                            <textarea name="message" id="message" placeholder="Message" rows="7"></textarea>
                        </div>
                    </div>
                    <ul className="actions">
                        <li><input type="submit" value="Send Message" className="button primary" /></li>
                    </ul>
                </form> */}
            </div>
            <div className="footer">
            
            </div>
        </section>
    )
}
