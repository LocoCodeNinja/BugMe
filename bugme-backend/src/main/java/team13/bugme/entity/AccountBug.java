package team13.bugme.entity;

import javax.persistence.*;

@Entity
public class AccountBug {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private int id;
    @Basic
    @Column(name = "bug_id", nullable = false)
    private int bugId;
    @Basic
    @Column(name = "account_id", nullable = false)
    private int accountId;
    @Basic
    @Column(name = "bug_enabled", nullable = true)
    private Boolean bugEnabled;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getBugId() {
        return bugId;
    }

    public void setBugId(int bugId) {
        this.bugId = bugId;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public Boolean getBugEnabled() {
        return bugEnabled;
    }

    public void setBugEnabled(Boolean bugEnabled) {
        this.bugEnabled = bugEnabled;
    }
}
