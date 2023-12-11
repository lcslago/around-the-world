const render = document.write.bind(document);

const moonIcon = (() => `
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16">
            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278"/>
        </svg>`)();

const sunIcon = (() => `
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16">
            <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
        </svg>`)();

const searchIcon = (() => `<svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26"
                                height="26" data-search-icon>
                                <path
                                    d="M10.25 2a8.25 8.25 0 0 1 6.34 13.53l5.69 5.69a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-5.69-5.69A8.25 8.25 0 1 1 10.25 2ZM3.5 10.25a6.75 6.75 0 1 0 13.5 0 6.75 6.75 0 0 0-13.5 0Z">
                                </path>
                            </svg>`)();

const infoIcon = (() => `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
        </svg>`)();

const sortIcon = (() => `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                    class="bi bi-filter-left opacity-50" viewBox="0 0 16 16">
                                    <path
                                        d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                                </svg>`)();

const nameAscendingIcon = (() => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351" />
                                    <path
                                        d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z" />
                                </svg>`)();

const nameDescendingIcon = (() => ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-sort-alpha-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351" />
                                    <path
                                        d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707z" />
                                </svg>`)();

const popDescendingIcon = (() => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-sort-numeric-up" viewBox="0 0 16 16">
                                    <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z" />
                                    <path fill-rule="evenodd"
                                        d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z" />
                                    <path
                                        d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707z" />
                                </svg>`)();

const popAscendingIcon = (() => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-sort-numeric-down" viewBox="0 0 16 16">
                                    <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z" />
                                    <path fill-rule="evenodd"
                                        d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z" />
                                    <path
                                        d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z" />
                                </svg>`)();

const filterIcon = (() => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-funnel-fill opacity-50" viewBox="0 0 16 16">
                                    <path
                                        d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                                </svg>`)();

const arrowUpIcon = (() => `
                    <svg class="arrow-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="25" height="25">
                        <path
                            d="M3.47 7.78a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0l4.25 4.25a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018L9 4.81v7.44a.75.75 0 0 1-1.5 0V4.81L4.53 7.78a.75.75 0 0 1-1.06 0Z">
                        </path>
                    </svg>`)();

const githubIcon = (() => `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                            class="bi bi-github opacity-75" viewBox="0 0 16 16">
                            <path
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                        </svg>`)();

const linkedinIcon = (() => `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                            class="bi bi-linkedin opacity-75" viewBox="0 0 16 16">
                            <path
                                d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4" />
                        </svg>`)();

const databaseIcon = (() => `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                            class="bi bi-database-fill opacity-50" viewBox="0 0 16 16">
                            <path
                                d="M3.904 1.777C4.978 1.289 6.427 1 8 1s3.022.289 4.096.777C13.125 2.245 14 2.993 14 4s-.875 1.755-1.904 2.223C11.022 6.711 9.573 7 8 7s-3.022-.289-4.096-.777C2.875 5.755 2 5.007 2 4s.875-1.755 1.904-2.223Z" />
                            <path
                                d="M2 6.161V7c0 1.007.875 1.755 1.904 2.223C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777C13.125 8.755 14 8.007 14 7v-.839c-.457.432-1.004.751-1.49.972C11.278 7.693 9.682 8 8 8s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972" />
                            <path
                                d="M2 9.161V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13s3.022-.289 4.096-.777C13.125 11.755 14 11.007 14 10v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972" />
                            <path
                                d="M2 12.161V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972" />
                        </svg>`)();

const flagIcon = (() => `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                            class="bi bi-flag-fill opacity-50" viewBox="0 0 16 16">
                            <path
                                d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                        </svg>`)();

const resultErrorIcon = (() => `
                            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" class="bi bi-x-circle p-2" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>`)();

const typeErrorIcon = (() => `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                        </svg>`)();

const projectLogoLink =
    "data:image/png;base64,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";

const projectLogo = (() => `<img
                            src="${projectLogoLink}">`)();

const favIcon = (() => `<link rel="shortcut icon" href="${projectLogoLink}" type="image/x-icon">`)();