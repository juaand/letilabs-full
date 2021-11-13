import React from 'react'
import {Helmet} from "react-helmet"

function Seo({title, content, name, meta = []}) {
    return (
        <Helmet title={title}
            htmlAttributes={{lang: "es"}}
            meta={[
                {
                    name: name,
                    content: content,
                }
            ]}
        />
    )
}

export default Seo
