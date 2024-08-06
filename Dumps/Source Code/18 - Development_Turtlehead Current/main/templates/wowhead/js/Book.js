function Book(D) {
    if (!D.parent || !D.pages || D.pages.length == 0) {
        return
    }
    D.parent = $(D.parent);
    var E, A, B;
    this.nPages = D.pages.length;
    this.parent = $(D.parent);
    this.parent.className += " book";
    E = ce("div");
    E.className = "header";
    if (this.nPages == 1) {
        E.style.display = "none"
    }
    ns(E);
    B = ce("div");
    B.style.visibility = "hidden";
    B.className = "previous";
    A = ce("a");
    A.appendChild(ct(String.fromCharCode(8249) + LANG.book_previous));
    A.href = "javascript:;";
    A.onclick = this.previous.bind(this);
    B.appendChild(A);
    E.appendChild(B);
    B = ce("div");
    B.style.visibility = "hidden";
    B.className = "next";
    A = ce("a");
    A.appendChild(ct(LANG.book_next + String.fromCharCode(8250)));
    A.href = "javascript:;";
    A.onclick = this.next.bind(this);
    B.appendChild(A);
    E.appendChild(B);
    B = ce("b");
    B.appendChild(ct("1"));
    E.appendChild(B);
    E.appendChild(ct(LANG.book_of));
    B = ce("b");
    B.appendChild(ct(this.nPages));
    E.appendChild(B);
    D.parent.appendChild(E);
    for (var C = 0; C < this.nPages; ++C) {
        E = ce("div");
        E.className = "page";
        E.style.display = "none";
        E.innerHTML = D.pages[C];
        D.parent.appendChild(E)
    }
    this.page = 1;
    this.changePage(D.page || 1)
}
Book.prototype = {
    changePage: function (B) {
        if (B < 1) {
            B = 1
        } else {
            if (B > this.nPages) {
                B = this.nPages
            }
        }
        var A = this.parent.childNodes;
        A[this.page].style.display = "none";
        A[B].style.display = "";
        this.page = B;
        A = A[0].childNodes;
        A[0].style.visibility = (B == 1) ? "hidden" : "visible";
        A[1].style.visibility = (B == this.nPages) ? "hidden" : "visible";
        A[2].innerHTML = B
    },
    next: function () {
        this.changePage(this.page + 1)
    },
    previous: function () {
        this.changePage(this.page - 1)
    }
};
